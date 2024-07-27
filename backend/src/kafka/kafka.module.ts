import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { EmailService } from 'src/notification/emailjs.service';
import { SMSService } from 'src/notification/twilio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from 'src/flight/flight.entity';
import { User } from 'src/user/user.entity';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([Flight, User]), NotificationModule],
  providers: [KafkaService, EmailService, SMSService],
  exports: [KafkaService],
})
export class KafkaModule {}