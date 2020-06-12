import { Availability } from '../availability/entities';
import { AddAvailabilityDto } from '../availability/dto';

type PartialAvailability = Omit<Availability, 'user'>;

export const availability: PartialAvailability = {
  id: 999,
  userId: 999,
  datetime: '2020-06-11T10:00:00Z',
  available: true,
};

export const availabilities: PartialAvailability[] = [availability];

export const addAvailabilityDto: AddAvailabilityDto = {
  datetime: '2020-06-11T10:00:00Z',
};
