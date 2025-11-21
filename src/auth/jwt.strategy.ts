import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'bpi-secret-key', // In production, use environment variable
    });
  }

  async validate(payload: any) {
    if (!payload.username) {
      throw new UnauthorizedException();
    }
    return { username: payload.username };
  }
}

