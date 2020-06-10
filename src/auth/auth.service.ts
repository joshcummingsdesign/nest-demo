import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities';
import { UserService } from '../user/user.service';
import { ILocalPayload, ILoginPayload, IJwtPayload } from './interfaces';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
  ) {}

  async validateUser(payload: ILocalPayload): Promise<User> {
    const email = payload.username;
    const user = await this.userService.findByEmail(email, {
      withAuth: true,
    });

    const isValidPassword = await this.cryptoService.comparePassword(
      payload.password,
      user.auth.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    const { auth, ...result } = user;
    return result as User;
  }

  login(user: User): ILoginPayload {
    const payload: IJwtPayload = { username: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async authenticate(payload: IJwtPayload): Promise<User> {
    const userId = payload.sub;
    const email = payload.username;
    const user = await this.userService.findOne(userId);
    if (email !== user.email) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
