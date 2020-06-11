import { student, studentAuth, teachers, users } from '../../__fixtures__';

export const mockUserService = jest.fn().mockImplementation(() => ({
  create: jest.fn(() => Promise.resolve(student)),
  findAll: jest.fn(() => Promise.resolve(users)),
  findAllTeachers: jest.fn(() => Promise.resolve(teachers)),
  findOne: jest.fn(() => Promise.resolve(student)),
  findByEmail: jest.fn(() => Promise.resolve(studentAuth)),
  update: jest.fn(() => Promise.resolve(student)),
  delete: jest.fn(() => Promise.resolve(student)),
}));
