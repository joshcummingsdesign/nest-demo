import { user, users } from '../../__fixtures__';

export const mockUserRepository = jest.fn().mockImplementation(() => ({
  save: jest.fn(() => user),
  find: jest.fn(() => users),
  findOne: jest.fn(() => user),
  update: jest.fn(() => user),
  delete: jest.fn(() => user),
}));
