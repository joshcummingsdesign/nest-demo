import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Lesson } from 'src/lesson/entities';
import { Availability } from '.';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  instrument: string;

  @OneToOne(() => User)
  profile: User;

  @OneToMany(() => Lesson, (lesson) => lesson.teacher)
  lessons: Lesson[];

  @OneToMany(() => Availability, (availability) => availability.teacher)
  availableTimes: Availability[];
}
