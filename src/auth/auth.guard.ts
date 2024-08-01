import { JWT_SECRET_KEY, TOKEN_HEADER_KEY, TOKEN_PREFIX } from '@app/config';
import { IRequestUser } from '@app/interfaces/request.interface';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: IRequestUser = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET_KEY,
      });
      // 💡 We're assigning the payload to the request object here so that we can access it in our route handlers
      request.user = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: IRequestUser): string | undefined {
    const [type, token] = request.headers[TOKEN_HEADER_KEY]?.split(' ') ?? [];
    return type === TOKEN_PREFIX ? token : undefined;
  }
}
