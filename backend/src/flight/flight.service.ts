import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './flight.entity';
import { KafkaService } from 'src/kafka/kafka.service';
import { User } from 'src/user/user.entity';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private kafkaService: KafkaService,
    private notificationService: NotificationService,
  ) {}

  async getFlights(
    date?: string,
    source?: string,
    destination?: string,
  ): Promise<Flight[]> {
    const whereClause: any = {};

    // if (date) whereClause.date = date;
    if (source) whereClause.source = source;
    if (destination) whereClause.destination = destination;

    return this.flightRepository.find({
      where: whereClause,
    });
  }

  async notifySubscription(
    userId: number,
    flightId: number,
    action: 'subscribe' | 'unsubscribe',
  ) {
    const message = {
      userId,
      flightId,
      action,
      timestamp: new Date().toISOString(),
    };
    await this.kafkaService.produce('flight-subscriptions', message);

    if (action == 'subscribe') {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['subscribedFlights'],
      });
      const flight = await this.flightRepository.findOne({
        where: { id: flightId },
      });

      if (!user || !flight) {
        throw new Error('User or Flight not found');
      }

      user.subscribedFlights.push(flight);
      this.userRepository.save(user);
    } else if (action == 'unsubscribe') {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['subscribedFlights'],
      });

      if (!user) {
        throw new Error('User not found');
      }

      user.subscribedFlights = user.subscribedFlights.filter(
        (flight) => flight.id !== flightId,
      );
      this.userRepository.save(user);
    }
  }

  async updateDelay(id: number, delay: number) {
    const flight = await this.flightRepository.findOne({
      where: { id },
      relations: ['subscribedUsers'],
    });

    if (!flight) {
      throw new NotFoundException(`Flight with ID ${id} not found`);
    }

    flight.delay = delay;
    flight.status = delay > 0 ? 'Delayed' : 'On Time';
    await this.flightRepository.save(flight);

    for (const user of flight.subscribedUsers) {
      const message = `Your flight ${flight.flightNumber} has been ${flight.status.toLowerCase()}. New departure time: ${flight.departureTime}.`;
      
      // Create in-app notification
      await this.notificationService.createNotification(user.id, {
        flightId: flight.flightNumber,
        message,
        timestamp: new Date(),
        method: 'App',
        recipient: user.id.toString(),
      });
    }

    // Produce Kafka event
    await this.kafkaService.produce('flight-delays', { flightId: id, delay });

    return flight;
  }
}

//   return [
//     {
//       id: 1,
//       flightNumber: 'FL001',
//       airline: 'SkyHigh Airways',
//       source: 'New York',
//       destination: 'London',
//       departureTime: new Date('2023-07-27T08:00:00Z'),
//       arrivalTime: new Date('2023-07-27T20:00:00Z'),
//       status: 'On Time',
//       delay: 0,
//     },
//     {
//       id: 2,
//       flightNumber: 'FL002',
//       airline: 'OceanAir',
//       source: 'London',
//       destination: 'Paris',
//       departureTime: new Date('2023-07-27T10:00:00Z'),
//       arrivalTime: new Date('2023-07-27T11:30:00Z'),
//       status: 'Delayed',
//       delay: 30,
//     },
//   ];
// }
// }
