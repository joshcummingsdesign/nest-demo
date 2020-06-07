import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/entities';

@Entity()
export class Availability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column({ default: true })
  available: boolean;

  @ManyToOne(() => User, (user) => user.availability)
  @JoinColumn({ name: 'userId' })
  user: User;
}
