import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IResponse } from '@app/interfaces/response.interface';
import { User } from '@app/user/entities/user.entity';
import { ICredential } from '@app/interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() userData: ICredential): Promise<IResponse> {
    const data: {
      token: string;
    } = await this.authService.signIn(userData);

    return {
      success: true,
      message: 'Logged In',
      data: data,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async signUp(@Body() userData: ICredential): Promise<IResponse> {
    const data: User = await this.authService.signUp(userData);

    return {
      success: true,
      message: 'Logged Up',
      data: data,
    };
  }
}
