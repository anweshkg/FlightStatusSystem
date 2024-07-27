import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Flight } from '../flight/flight.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @ManyToMany(() => Flight, (flight) => flight.subscribedUsers)
  @JoinTable()
  subscribedFlights: Flight[];
}
