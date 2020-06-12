import { IsISO8601 } from 'class-validator';

export class AddAvailabilityDto {
  @IsISO8601()
  datetime: string;
}
