import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from 'src/student/entities';
import { Teacher } from 'src/teacher/entities';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  time: string;

  @ManyToOne(() => Student, (student) => student.lessons)
  student: Student;

  @ManyToOne(() => Teacher, (teacher) => teacher.lessons)
  teacher: Teacher;
}
