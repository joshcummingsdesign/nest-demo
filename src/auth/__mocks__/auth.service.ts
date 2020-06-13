import { student, loginPayload } from '../../__fixtures__';

export const mockAuthService = jest.fn().mockImplementation(() => ({
  create: jest.fn(),
  validateUser: jest.fn(() => Promise.resolve(student)),
  login: jest.fn(() => loginPayload),
  validateJwtPayload: jest.fn(() => Promise.resolve(student)),
}));
