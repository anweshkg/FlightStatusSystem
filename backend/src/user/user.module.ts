import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Flight } from 'src/flight/flight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Flight])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}