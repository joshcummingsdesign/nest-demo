import { Availability } from '../availability/entities';
import { AddAvailabilityDto } from '../availability/dto';

export const availability: Partial<Availability> = {
  id: 999,
  userId: 999,
  datetime: '2020-06-21T00:00:00.000Z',
  available: true,
};

export const availabilities: Partial<Availability>[] = [
  {
    id: 998,
    userId: 999,
    datetime: '2020-06-20T23:00:00.000Z',
    available: false,
  },
  {
    id: 999,
    userId: 999,
    datetime: '2020-06-21T00:00:00.000Z',
    available: true,
  },
];

export const addAvailabilityDto: AddAvailabilityDto = {
  datetime: '2020-06-11T10:00:00Z',
};
