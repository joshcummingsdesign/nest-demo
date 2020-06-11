import { IsString } from 'class-validator';

export class AddAvailabilityDto {
  // TODO: Require date strings
  @IsString()
  date: string;

  // TODO: Require date strings
  @IsString()
  time: string;
}
