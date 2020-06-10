import { lesson, lessons } from '../../__fixtures__';

export const mockLessonRepository = jest.fn().mockImplementation(() => ({
  save: jest.fn(() => Promise.resolve(lesson)),
  find: jest.fn(() => Promise.resolve(lessons)),
  findOne: jest.fn(() => Promise.resolve(lesson)),
  delete: jest.fn(() => Promise.resolve(lesson)),
}));
