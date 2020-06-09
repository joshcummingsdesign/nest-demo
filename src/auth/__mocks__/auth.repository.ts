import { auth } from '../../__fixtures__';

export const mockAuthRepository = jest.fn().mockImplementation(() => ({
  save: jest.fn(() => auth),
}));
