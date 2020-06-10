import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Lesson } from '../../lesson/entities';
import { Availability } from '../../availability/entities';
import { Auth } from '../../auth/entities';

export const roles = <const>['student', 'teacher'];
export type Role = typeof roles[number];

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  instrument: string;

  @Column()
  role: Role;

  @OneToOne(() => Auth, (auth) => auth.user)
  auth: Auth;

  @OneToMany(() => Availability, (availability) => availability.user)
  availability: Availability[];

  @OneToMany(() => Lesson, (lesson) => lesson.studentId)
  lessonsToTake: Lesson[];

  @OneToMany(() => Lesson, (lesson) => lesson.teacherId)
  lessonsToTeach: Lesson[];
}
