import { IAuth } from '@app/interfaces/auth.interface';
import { User } from '@app/user/entities/user.entity';
import { UserService } from '@app/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signIn(userData: IAuth): Promise<{ token: string }> {
    const user = await this.userService.findOneByUsername(userData.username);

    if (!user) throw new UnauthorizedException();

    const isPasswordMatching: boolean = await compare(
      userData.password,
      user.password,
    );
    if (!isPasswordMatching) throw new UnauthorizedException();

    const payload = { sub: user.id, username: user.username };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(userData: IAuth): Promise<User> {
    return this.userService.create(userData);
  }
}
