import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { envs } from '@/envs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();

    if (!req.headers.authorization) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const token = req.headers.authorization.replace('Bearer ', '');
      req.user = this.verify(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  verify(token: string) {
    return jwt.verify(token, envs.JWT_SECRET);
  }
}
