import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/entities';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentId: number;

  @Column()
  teacherId: number;

  @Column()
  date: string;

  @Column()
  time: string;

  @ManyToOne(() => User, (user) => user.lessonsToTake)
  @JoinColumn({ name: 'studentId' })
  student: User;

  @ManyToOne(() => User, (user) => user.lessonsToTeach)
  @JoinColumn({ name: 'teacherId' })
  teacher: User;
}
