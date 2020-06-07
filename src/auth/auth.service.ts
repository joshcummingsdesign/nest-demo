import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findByEmail(email, { withAuth: true });
    if (user.auth.password !== pass) {
      throw new UnauthorizedException('Incorrect password');
    }
    const { auth, ...result } = user;
    return result as User;
  }
}
