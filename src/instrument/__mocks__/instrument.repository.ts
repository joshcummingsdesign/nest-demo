import { instruments, instrument } from '../../__fixtures__';

export const mockInstrumentRepository = jest.fn().mockImplementation(() => ({
  find: jest.fn(() => Promise.resolve(instruments)),
  findOne: jest.fn(() => Promise.resolve(instrument)),
}));
