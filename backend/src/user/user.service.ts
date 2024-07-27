import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Flight } from '../flight/flight.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ 
      where: { email },
      relations: ['subscribedFlights']
    });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(id: number, updateUserDto: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id } });
  }

  async getProfile(userId: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['subscribedFlights']
    });
  }

  async subscribeToFlight(userId: number, flightId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['subscribedFlights']
    });
    const flight = await this.flightRepository.findOne({ where: { id: flightId } });

    if (!user || !flight) {
      throw new Error('User or Flight not found');
    }

    user.subscribedFlights.push(flight);
    return this.userRepository.save(user);
  }

  async unsubscribeFromFlight(userId: number, flightId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['subscribedFlights']
    });

    if (!user) {
      throw new Error('User not found');
    }

    user.subscribedFlights = user.subscribedFlights.filter(flight => flight.id !== flightId);
    return this.userRepository.save(user);
  }
}