import { studentRole } from '../../__fixtures__';

export const mockRoleService = jest.fn().mockImplementation(() => ({
  findByName: jest.fn(() => Promise.resolve(studentRole)),
}));
