import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Flight } from '../flight/flight.entity';
import { Notification } from 'src/notification/notification.entity';

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

  @Column()
  role: 'user' | 'admin';

  @ManyToMany(() => Flight, (flight) => flight.subscribedUsers)
  @JoinTable()
  subscribedFlights: Flight[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];
}
