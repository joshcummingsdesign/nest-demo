import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EConfigOptions } from 'src/config';
import { User } from 'src/user/entities';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(EConfigOptions.JWT_SECRET),
    });
  }

  validate(payload: { username: string; sub: number }): Promise<User> {
    return this.authService.validateUserFromTokenPayload({
      id: payload.sub,
      email: payload.username,
    });
  }
}
