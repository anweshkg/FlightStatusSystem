import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { readFileSync } from 'fs';
import { Kafka, Producer, Consumer } from 'kafkajs';
import * as path from 'path';
import { Flight } from 'src/flight/flight.entity';
import { EmailService } from 'src/notification/emailjs.service';
import { SMSService } from 'src/notification/twilio.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor(
    private readonly emailService: EmailService,
    private readonly smsService: SMSService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>
  ) {
    this.kafka = new Kafka({
      clientId: 'flight-status-app',
      brokers: [process.env.KAFKA_BROKER],
      ssl: {
        ca: [readFileSync(path.resolve('ca.pem'), 'utf-8')],
      },
      sasl: {
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD,
        mechanism: 'plain',
      },
    });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'flight-status-group' });
  }

  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: 'flight-subscriptions',
      fromBeginning: true,
    });
    await this.consumer.subscribe({
      topic: 'flight-delays',
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const payload = JSON.parse(message.value.toString());
        
        if (topic === 'flight-subscriptions') {
          await this.handleSubscriptionMessage(payload);
        } else if (topic === 'flight-delays') {
          await this.handleDelayMessage(payload);
        }
      },
    });
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }

  async produce(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }

  private async handleSubscriptionMessage(payload: any) {
    const { userId, flightId, action } = payload;
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['subscribedFlights']
    });

    if (!user) {
      console.error(`User with id ${userId} not found`);
      return;
    }

    const subject = `Flight Subscription ${action === 'subscribe' ? 'Confirmation' : 'Cancellation'}`;
    const body = `You have successfully ${action}d to flight ${flightId}`;

    await this.emailService.sendEmail(user.email, subject, body);
    // if (user.phoneNumber) {
    //   await this.smsService.sendSMS(user.phoneNumber, body);
    // }
  }

  private async handleDelayMessage(payload: any) {
    const { flightId, delay } = payload;
    const flight = await this.flightRepository.findOne({
      where: { id: flightId },
      relations: ['subscribedUsers'],
    });

    if (!flight) {
      console.error(`Flight with id ${flightId} not found`);
      return;
    }

    const subject = 'Flight Delay Notification';
    const body = `Your flight ${flight.flightNumber} has been delayed by ${delay} minutes`;

    for (const user of flight.subscribedUsers) {
      await this.emailService.sendEmail(user.email, subject, body);
      // if (user.phoneNumber) {
      //   await this.smsService.sendSMS(user.phoneNumber, body);
      // }
    }
  }
}
