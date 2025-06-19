import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './users.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { phone_number: string; password: string }) {
    return this.authService.login(body.phone_number, body.password);
  }
}