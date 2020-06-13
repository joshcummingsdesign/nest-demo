import { IsOptional, IsAlpha, Length, IsIn } from 'class-validator';
import { instruments, InstrumentName } from '../../instrument/entities';

export class UpdateUserDto {
  @IsAlpha()
  @Length(1, 35)
  @IsOptional()
  firstName?: string;

  @IsAlpha()
  @Length(1, 35)
  @IsOptional()
  lastName?: string;

  @IsIn(instruments)
  @IsOptional()
  instrument?: InstrumentName;
}
