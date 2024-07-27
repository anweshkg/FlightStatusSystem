import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { Flight } from './flight.entity';
import { KafkaService } from 'src/kafka/kafka.service';
import { User } from 'src/user/user.entity';
import { KafkaModule } from 'src/kafka/kafka.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([Flight, User]), KafkaModule, NotificationModule],
  controllers: [FlightController],
  providers: [FlightService, KafkaService],
  exports: [FlightService],
})
export class FlightModule {}