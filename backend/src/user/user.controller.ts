import { Controller, Get, Post, Delete, Param, UseGuards, Req, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gaurd';

  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Req() req) {
      return this.userService.getProfile(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('profile')
    updateProfile(@Req() req, @Body() updateUserDto: any) {
      return this.userService.update(req.user.id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('subscribe/:flightId')
    async subscribeToFlight(@Req() req, @Param('flightId') flightId: string) {
      return this.userService.subscribeToFlight(req.user.id, parseInt(flightId));
    }

    @UseGuards(JwtAuthGuard)
    @Delete('unsubscribe/:flightId')
    async unsubscribeFromFlight(@Req() req, @Param('flightId') flightId: string) {
      return this.userService.unsubscribeFromFlight(req.user.id, parseInt(flightId));
    }
  }