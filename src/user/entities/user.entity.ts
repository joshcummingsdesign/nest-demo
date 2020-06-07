import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Lesson } from 'src/lesson/entities';
import { Availability } from 'src/availability/entities';

export const userTypes = <const>['student', 'teacher'];
export type UserType = typeof userTypes[number];

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
  type: UserType;

  @OneToMany(() => Availability, (availability) => availability.user)
  availability: Availability;

  @OneToMany(() => Lesson, (lesson) => lesson.studentId)
  lessonsToTake: Lesson[];

  @OneToMany(() => Lesson, (lesson) => lesson.teacherId)
  lessonsToTeach: Lesson[];
}
