import { Availability } from '../availability/entities';
import { AddAvailabilityDto } from '../availability/dto';

export const availability: Partial<Availability> = {
  id: 999,
  userId: 999,
  datetime: '2020-06-20T10:00:00-07:00',
  available: true,
};

export const availabilities: Partial<Availability>[] = [
  {
    id: 998,
    userId: 999,
    datetime: '2020-06-20T09:00:00-07:00',
    available: false,
  },
  {
    id: 999,
    userId: 999,
    datetime: '2020-06-20T10:00:00-07:00',
    available: true,
  },
];

export const addAvailabilityDto: AddAvailabilityDto = {
  datetime: '2020-06-20T11:00:00-07:00',
};
