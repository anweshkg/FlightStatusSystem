import { Injectable } from '@nestjs/common';
import { Vonage } from '@vonage/server-sdk';
import { Auth } from '@vonage/auth';

@Injectable()
export class SMSService {
  private client: Vonage;

  constructor() {
    const credentials = new Auth({
      apiKey: process.env.VONAGE_API_KEY,
      apiSecret: process.env.VONAGE_API_SECRET
    });

    this.client = new Vonage(credentials);
  }

  async sendSMS(to: string, body: string) {
    try {
      const response = await this.client.sms.send({
        to: to,
        from: process.env.VONAGE_PHONE_NUMBER,
        text: body
      });

      console.log('SMS sent successfully:', response.messages[0].messageId);
      return response;
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw error;
    }
  }
}