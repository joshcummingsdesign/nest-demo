import { student, users } from '../../__fixtures__';

export const mockUserRepository = jest.fn().mockImplementation(() => ({
  save: jest.fn(() => Promise.resolve(student)),
  find: jest.fn(() => Promise.resolve(users)),
  findOne: jest.fn(() => Promise.resolve(student)),
  update: jest.fn(() => Promise.resolve(student)),
  delete: jest.fn(() => Promise.resolve(student)),
}));
