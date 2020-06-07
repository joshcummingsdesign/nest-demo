import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards';

@Controller('api/v1/auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
