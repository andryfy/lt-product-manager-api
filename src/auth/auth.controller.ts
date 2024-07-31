import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuth } from '@app/interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() userData: IAuth) {
    return this.authService.signIn(userData);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() userData: IAuth) {
    return this.authService.signUp(userData);
  }
}
