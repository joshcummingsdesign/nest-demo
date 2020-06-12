import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '../../auth/interfaces';
import { student, teacher } from '../../__fixtures__';
import { RoleName, ERole } from '../../role/entities';

export const getMockToken = (jwtService: JwtService, role: RoleName) => {
  const user = role === ERole.teacher ? teacher : student;
  const payload: IJwtPayload = { username: user.email, sub: user.id };
  const mockToken = jwtService.sign(payload);
  return `Bearer ${mockToken}`;
};
