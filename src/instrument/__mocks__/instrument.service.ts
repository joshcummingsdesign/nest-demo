import { instruments } from '../../__fixtures__';

export const mockInstrumentService = jest.fn().mockImplementation(() => ({
  findAll: jest.fn(() => Promise.resolve(instruments)),
}));
