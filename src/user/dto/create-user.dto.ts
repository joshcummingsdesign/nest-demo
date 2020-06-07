import { IsString, IsIn } from 'class-validator';
import { roles, Role } from '../entities';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  instrument: string;

  @IsIn(roles as any)
  type: Role;
}
