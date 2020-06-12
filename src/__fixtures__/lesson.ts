import { Lesson } from '../lesson/entities';
import { BookLessonDto } from '../lesson/dto';
import { teacher } from './user';

type PartialLesson = Omit<Lesson, 'student' | 'teacher'>;

export const lesson: PartialLesson = {
  id: 999,
  studentId: 998,
  teacherId: 999,
  datetime: '2020-06-11T10:00:00Z',
};

export const lessons: PartialLesson[] = [lesson];

export const bookLessonDto: BookLessonDto = {
  teacherId: teacher.id,
  datetime: '2020-06-11T10:00:00Z',
};
