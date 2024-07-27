import { Controller, Get, Query, UseGuards, Post, Delete, Param, Req } from '@nestjs/common';
import { FlightService } from './flight.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gaurd';

@Controller('flights')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Get()
  async getFlights(
    @Query('date') date: string,
    @Query('source') source: string,
    @Query('destination') destination: string,
  ) {
    return this.flightService.getFlights(date, source, destination);
  }

  @UseGuards(JwtAuthGuard)
  @Post('subscribe/:flightId')
  async subscribeToFlight(@Req() req, @Param('flightId') flightId: string) {
    await this.flightService.notifySubscription(req.user.id, parseInt(flightId), 'subscribe');
    return { message: 'Subscribed successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('unsubscribe/:flightId')
  async unsubscribeFromFlight(@Req() req, @Param('flightId') flightId: string) {
    await this.flightService.notifySubscription(req.user.id, parseInt(flightId), 'unsubscribe');
    return { message: 'Unsubscribed successfully' };
  }
  
  @Post('update-delay/:id')
  async updateDelay(@Param('id') id: string) {
    const delay = Math.floor(Math.random() * 61); // Random delay between 0 and 60
    return this.flightService.updateDelay(+id, delay);
  }
}
