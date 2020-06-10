import { Lesson } from '../lesson/entities';
import { BookLessonDto } from '../lesson/dto';

type PartialLesson = Omit<Lesson, 'student' | 'teacher'>;

export const lesson: PartialLesson = {
  id: 1,
  studentId: 1,
  teacherId: 2,
  date: '2020-06-10',
  time: '09:00:00',
};

export const lessons: PartialLesson[] = [lesson];

export const bookLessonDto: BookLessonDto = {
  teacherId: 2,
  date: '2020-06-10',
  time: '09:00:00',
};
