import { user, jwtPayload } from '../../__fixtures__';

export const mockAuthService = jest.fn().mockImplementation(() => ({
  validateUser: jest.fn(() => Promise.resolve(user)),
  login: jest.fn(() => jwtPayload),
  validateJwtPayload: jest.fn(() => Promise.resolve(user)),
}));
