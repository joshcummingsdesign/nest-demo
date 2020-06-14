import { Lesson } from '../lesson/entities';
import { BookLessonDto } from '../lesson/dto';
import { teacher } from './user';

export const lesson: Partial<Lesson> = {
  id: 999,
  studentId: 998,
  teacherId: 999,
  datetime: '2020-06-20T23:00:00.000Z',
};

export const lessons: Partial<Lesson>[] = [
  {
    id: 999,
    studentId: 998,
    teacherId: 999,
    datetime: '2020-06-20T23:00:00.000Z',
  },
];

export const bookLessonDto: BookLessonDto = {
  teacherId: teacher.id,
  datetime: '2020-06-11T10:00:00Z',
};
