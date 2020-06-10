import { user, users } from '../../__fixtures__';

export const mockUserRepository = jest.fn().mockImplementation(() => ({
  save: jest.fn(() => Promise.resolve(user)),
  find: jest.fn(() => Promise.resolve(users)),
  findOne: jest.fn(() => Promise.resolve(user)),
  update: jest.fn(() => Promise.resolve(user)),
  delete: jest.fn(() => Promise.resolve(user)),
}));
