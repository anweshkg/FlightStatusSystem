import { Module } from '@nestjs/common';
import { EmailService } from './emailjs.service';
import { SMSService } from './twilio.service';

@Module({
  imports: [],
  providers: [EmailService, SMSService],
  exports: [EmailService, SMSService],
})
export class NotificationModule {}
