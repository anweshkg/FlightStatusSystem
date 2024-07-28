import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './notification.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gaurd';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getNotificationsForUser(@Request() req): Promise<Notification[]> {
    const userId = req.user.id;
    return this.notificationService.getNotificationsForUser(userId);
  }
}