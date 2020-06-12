import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Lesson } from '../../lesson/entities';
import { Availability } from '../../availability/entities';
import { Auth } from '../../auth/entities';
import { Role } from '../../role/entities';
import { Instrument } from '../../instrument/entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO: Test columns with length
  @Column({ length: 35 })
  firstName: string;

  @Column({ length: 35 })
  lastName: string;

  @Column()
  email: string;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  role: Role;

  @ManyToOne(() => Instrument, (instrument) => instrument.users, {
    eager: true,
  })
  instrument: Instrument;

  @OneToOne(() => Auth, (auth) => auth.user)
  auth: Auth;

  @OneToMany(() => Availability, (availability) => availability.user)
  availability: Availability[];

  @OneToMany(() => Lesson, (lesson) => lesson.studentId)
  lessonsToTake: Lesson[];

  @OneToMany(() => Lesson, (lesson) => lesson.teacherId)
  lessonsToTeach: Lesson[];
}
