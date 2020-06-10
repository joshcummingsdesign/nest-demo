import { user, userAuth, users } from '../../__fixtures__';

export const mockUserService = jest.fn().mockImplementation(() => ({
  create: jest.fn(() => Promise.resolve(user)),
  findAll: jest.fn(() => Promise.resolve(users)),
  findOne: jest.fn(() => Promise.resolve(user)),
  findByEmail: jest.fn(() => Promise.resolve(userAuth)),
  update: jest.fn(() => Promise.resolve(user)),
  delete: jest.fn(() => Promise.resolve(user)),
}));
