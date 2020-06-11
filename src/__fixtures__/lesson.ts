import { Lesson } from '../lesson/entities';
import { BookLessonDto } from '../lesson/dto';
import { teacher } from './user';

type PartialLesson = Omit<Lesson, 'student' | 'teacher'>;

export const lesson: PartialLesson = {
  id: 999,
  studentId: 998,
  teacherId: 999,
  date: '2020-06-10',
  time: '09:00:00',
};

export const lessons: PartialLesson[] = [lesson];

export const bookLessonDto: BookLessonDto = {
  teacherId: teacher.id,
  date: '2020-06-10',
  time: '09:00:00',
};
