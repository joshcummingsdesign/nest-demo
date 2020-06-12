import { instruments } from '../../__fixtures__';

export const mockInstrumentRepository = jest.fn().mockImplementation(() => ({
  find: jest.fn(() => Promise.resolve(instruments)),
}));
