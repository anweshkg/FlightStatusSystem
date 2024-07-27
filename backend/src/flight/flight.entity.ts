import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  flightNumber: string;

  @Column()
  airline: string;

  @Column()
  source: string;

  @Column()
  destination: string;

  @Column()
  departureTime: Date;

  @Column()
  arrivalTime: Date;

  @Column()
  status: string;

  @Column({ nullable: true })
  delay: number;

  @ManyToMany(() => User, (user) => user.subscribedFlights)
  subscribedUsers: User[];
}
