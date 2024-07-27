import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';

@Injectable()
export class SMSService {
  // private client: twilio.Twilio;

  // constructor() {
  //   this.client = twilio(
  //     process.env.TWILIO_ACCOUNT_SID,
  //     process.env.TWILIO_AUTH_TOKEN
  //   );
  // }

  // async sendSMS(to: string, body: string) {
  //   try {
  //     const message = await this.client.messages.create({
  //       body: body,
  //       from: process.env.TWILIO_PHONE_NUMBER,
  //       to: to,
  //     });
  //     console.log('SMS sent successfully:', message.sid);
  //     return message;
  //   } catch (error) {
  //     console.error('Error sending SMS:', error);
  //     throw error;
  //   }
  // }
}