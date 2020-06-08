import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards';
import { AuthService } from './auth.service';
import { IJwtPayload } from './interfaces';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any): IJwtPayload {
    return this.authService.login(req.user);
  }
}
