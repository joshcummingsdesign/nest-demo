import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '../../auth/interfaces';
import { user } from '../../__fixtures__';

export const getMockToken = (jwtService: JwtService) => {
  const payload: IJwtPayload = { username: user.email, sub: user.id };
  const mockToken = jwtService.sign(payload);
  return `Bearer ${mockToken}`;
};
