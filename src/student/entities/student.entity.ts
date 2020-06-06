import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Lesson } from 'src/lesson/entities';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  profile: User;

  @OneToMany(() => Lesson, (lesson) => lesson.student)
  lessons: Lesson[];
}
