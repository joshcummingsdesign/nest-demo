import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Transform, Exclude } from 'class-transformer';
import { Lesson } from '../../lesson/entities';
import { Availability } from '../../availability/entities';
import { Auth } from '../../auth/entities';
import { Role } from '../../role/entities';
import { Instrument } from '../../instrument/entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 35 })
  firstName: string;

  @Column({ length: 35 })
  lastName: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'roleId' })
  @Transform((role) => role.name)
  role: Role;

  @Column()
  @Exclude()
  instrumentId: number;

  @ManyToOne(() => Instrument, (instrument) => instrument.users, {
    eager: true,
  })
  @JoinColumn({ name: 'instrumentId' })
  @Transform((instrument) => instrument.name)
  instrument: Instrument;

  @OneToOne(() => Auth, (auth) => auth.user)
  auth: Auth;

  @OneToMany(() => Availability, (availability) => availability.user)
  availability: Availability[];

  @OneToMany(() => Lesson, (lesson) => lesson.studentId)
  lessonsToTake: Lesson[];

  @OneToMany(() => Lesson, (lesson) => lesson.teacherId)
  lessonsToTeach: Lesson[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
