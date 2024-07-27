import { Injectable } from '@nestjs/common';
import * as emailjs from '@emailjs/nodejs';

@Injectable()
export class EmailService {
  constructor() {
    emailjs.init({
      publicKey: process.env.EMAILJS_PUBLIC_KEY,
      privateKey: process.env.EMAILJS_PRIVATE_KEY,
    });
  }

  async sendEmail(to: string, subject: string, body: string) {
    try {
      const response = await emailjs.send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        {
          to_email: to,
          subject: subject,
          message: body,
        }
      );
      console.log('Email sent successfully:', response);
      return response;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}