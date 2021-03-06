import { Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards';
import { AuthService } from './auth.service';
import { ILoginPayload } from './interfaces';
import { User } from '../user/entities';
import { ReqUser } from '../user/decorators';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@ReqUser() user: User): ILoginPayload {
    return this.authService.login(user);
  }
}
