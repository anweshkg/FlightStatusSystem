import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  flightId: string;

  @Column()
  message: string;

  @Column()
  timestamp: Date;

  @Column()
  method: string;

  @Column()
  recipient: string;

  @ManyToOne(() => User, user => user.notifications)
  user: User;
}
