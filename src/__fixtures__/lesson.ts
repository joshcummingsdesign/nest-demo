import { Lesson } from '../lesson/entities';
import { BookLessonDto } from '../lesson/dto';
import { teacher } from './user';

export const lesson: Partial<Lesson> = {
  id: 999,
  studentId: 998,
  teacherId: 999,
  datetime: '2020-06-20T09:00:00-07:00',
};

export const lessons: Partial<Lesson>[] = [
  {
    id: 999,
    studentId: 998,
    teacherId: 999,
    datetime: '2020-06-20T09:00:00-07:00',
  },
];

export const bookLessonDto: BookLessonDto = {
  teacherId: teacher.id,
  datetime: '2020-06-20T10:00:00-07:00',
};
