import { Module } from '@nestjs/common';
import { EmailService } from './emailjs.service';
import { SMSService } from './twilio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { NotificationService } from './notification.service';
import { Notification } from './notification.entity';
import { NotificationsController } from './notification.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, User])],
  controllers: [NotificationsController],
  providers: [EmailService, SMSService, NotificationService],
  exports: [EmailService, SMSService, NotificationService],
})
export class NotificationModule {}
