import { IsString, IsIn } from 'class-validator';
import { userTypes, UserType } from '../entities';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  instrument: string;

  @IsIn(userTypes as any)
  type: UserType;
}
