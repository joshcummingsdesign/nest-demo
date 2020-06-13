import {
  Injectable,
  UnauthorizedException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities';
import { ILocalPayload, ILoginPayload, IJwtPayload } from './interfaces';
import { CryptoService } from '../crypto/crypto.service';
import { Repository } from 'typeorm';
import { Auth } from './entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
  ) {}

  async create(userId: number, hashedPassword: string): Promise<void> {
    await this.authRepository.save({ userId, password: hashedPassword });
  }

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
