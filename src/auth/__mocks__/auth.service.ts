import { user, loginPayload } from '../../__fixtures__';

export const mockAuthService = jest.fn().mockImplementation(() => ({
  validateUser: jest.fn(() => Promise.resolve(user)),
  login: jest.fn(() => loginPayload),
  validateJwtPayload: jest.fn(() => Promise.resolve(user)),
}));
