import { IsString, IsOptional, IsIn } from 'class-validator';
import { roles, Role } from '../entities';

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

  @IsIn(roles as any)
  @IsOptional()
  type?: Role;
}
