import { Lesson } from '../lesson/entities';
import { CreateLessonDto } from '../lesson/dto';

type PartialLesson = Omit<Lesson, 'student' | 'teacher'>;

export const lesson: PartialLesson = {
  id: 1,
  studentId: 1,
  teacherId: 2,
  date: '2020-06-10',
  time: '09:00:00',
};

export const lessons: PartialLesson[] = [lesson];

export const createLessonDto: CreateLessonDto = {
  teacherId: 2,
  date: '2020-06-10',
  time: '09:00:00',
};
