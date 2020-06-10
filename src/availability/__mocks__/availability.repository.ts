import { availability, availabilities } from '../../__fixtures__';

export const mockAvailabilityRepository = jest.fn().mockImplementation(() => ({
  save: jest.fn(() => Promise.resolve(availability)),
  find: jest.fn(() => Promise.resolve(availabilities)),
  findOne: jest.fn(() => Promise.resolve(availability)),
  delete: jest.fn(() => Promise.resolve(availability)),
}));
