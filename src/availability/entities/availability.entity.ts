import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities';

@Entity()
export class Availability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: 'timestamp' })
  datetime: string;

  @Column({ default: true })
  available: boolean;

  @ManyToOne(() => User, (user) => user.availability, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
