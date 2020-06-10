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
import { getEnumKeys } from '../../utils/types-utils';

export enum ERole {
  student = 'student',
  teacher = 'teacher',
}
export const roles = getEnumKeys(ERole);
export type Role = keyof typeof ERole;

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
