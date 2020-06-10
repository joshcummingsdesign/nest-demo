import { user, userAuth, users } from '../../__fixtures__';

export const mockUserService = jest.fn().mockImplementation(() => ({
  create: jest.fn(() => user),
  findAll: jest.fn(() => users),
  findOne: jest.fn(() => user),
  findByEmail: jest.fn(() => userAuth),
  update: jest.fn(() => user),
  delete: jest.fn(() => user),
}));
