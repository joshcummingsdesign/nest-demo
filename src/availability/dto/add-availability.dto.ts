import { IsString } from 'class-validator';

export class AddAvailabilityDto {
  @IsString()
  date: string;

  @IsString()
  time: string;
}
