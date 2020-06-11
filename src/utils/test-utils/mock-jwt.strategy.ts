import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../user/entities';
import { student, teacher } from '../../__fixtures__';
import { IJwtPayload } from '../../auth/interfaces';

@Injectable()
export class MockJwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    });
  }

  validate(payload: IJwtPayload): Promise<User> {
    return Promise.resolve(
      payload.sub === student.id ? (student as User) : (teacher as User),
    );
  }
}
