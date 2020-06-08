import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities';
import { UserService } from 'src/user/user.service';
import { IJwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload: {
    email: string;
    password: string;
  }): Promise<User> {
    const user = await this.userService.findByEmail(payload.email, {
      withAuth: true,
    });
    if (user.auth.password !== payload.password) {
      throw new UnauthorizedException();
    }
    const { auth, ...result } = user;
    return result as User;
  }

  login(user: User): IJwtPayload {
    const payload = { username: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validateUserFromTokenPayload(payload: {
    id: number;
    email: string;
  }): Promise<User> {
    const user = await this.userService.findOne(payload.id);
    if (user.email !== payload.email) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
