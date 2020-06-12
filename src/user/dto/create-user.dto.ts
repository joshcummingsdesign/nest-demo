import { IsAlpha, Length, IsEmail, Matches, IsIn } from 'class-validator';
import { PASSWORD_REGEX } from '../../utils/regex-utils';
import { roles, RoleName } from '../../role/entities';
import { instruments, InstrumentName } from '../../instrument/entities';

export class CreateUserDto {
  @IsAlpha()
  @Length(1, 35)
  firstName: string;

  @IsAlpha()
  @Length(1, 35)
  lastName: string;

  @IsEmail()
  email: string;

  @Matches(PASSWORD_REGEX, { message: 'Invalid password' })
  password: string;

  @IsIn(instruments)
  instrument: InstrumentName;

  @IsIn(roles)
  role: RoleName;
}
