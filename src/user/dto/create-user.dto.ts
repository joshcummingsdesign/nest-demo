import { IsString, IsIn } from 'class-validator';
import { roles, Role } from '../entities';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  // TODO: Set min and max length as well as require special chars
  @IsString()
  password: string;

  @IsString()
  instrument: string;

  @IsIn(roles)
  role: Role;
}
