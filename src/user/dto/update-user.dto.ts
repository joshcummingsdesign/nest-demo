import { IsString, IsOptional, IsIn } from 'class-validator';
import { userTypes, UserType } from '../entities';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  instrument?: string;

  @IsIn(userTypes as any)
  @IsOptional()
  type?: UserType;
}
