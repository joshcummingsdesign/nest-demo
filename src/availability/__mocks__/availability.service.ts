import { availability, availabilities } from '../../__fixtures__';

export const mockAvailabilityService = jest.fn().mockImplementation(() => ({
  create: jest.fn(() => Promise.resolve(availability)),
  findAll: jest.fn(() => Promise.resolve(availabilities)),
  findOne: jest.fn(() => Promise.resolve(availability)),
  findByDatetime: jest.fn(() => Promise.resolve(availability)),
  update: jest.fn(() => Promise.resolve(availability)),
  delete: jest.fn(() => Promise.resolve(availability)),
}));
