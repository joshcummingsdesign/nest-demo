import { studentRole } from '../../__fixtures__';

export const mockRoleRepository = jest.fn().mockImplementation(() => ({
  findOne: jest.fn(() => Promise.resolve(studentRole)),
}));
