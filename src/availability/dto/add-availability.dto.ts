import { IsDateString } from 'class-validator';

export class AddAvailabilityDto {
  @IsDateString()
  datetime: string;
}
