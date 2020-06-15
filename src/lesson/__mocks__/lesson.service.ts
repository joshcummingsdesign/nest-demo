import { lesson, lessons } from '../../__fixtures__';

export const mockLessonService = jest.fn().mockImplementation(() => ({
  create: jest.fn(() => Promise.resolve(lesson)),
  findAll: jest.fn(() => Promise.resolve(lessons)),
  findOne: jest.fn(() => Promise.resolve(lesson)),
  findByDatetime: jest.fn(() => Promise.resolve(lesson)),
  delete: jest.fn(() => Promise.resolve(lesson)),
}));
