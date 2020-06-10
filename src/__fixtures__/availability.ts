import { Availability } from '../availability/entities';
import { AddAvailabilityDto } from '../availability/dto';

type PartialAvailability = Omit<Availability, 'user'>;

export const availability: PartialAvailability = {
  id: 1,
  userId: 1,
  date: '2020-06-06',
  time: '09:44:22',
  available: true,
};

export const availabilities: PartialAvailability[] = [availability];

export const addAvailabilityDto: AddAvailabilityDto = {
  date: '2020-06-06',
  time: '09:44:22',
};
