import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly defaultUser = {
    username: 'bpi',
    password: 'bpi2023',
  };

  constructor(private jwtService: JwtService) {}

  validateUser(
    username: string,
    password: string,
  ): { username: string } | null {
    if (
      username === this.defaultUser.username &&
      password === this.defaultUser.password
    ) {
      return { username: this.defaultUser.username };
    }
    return null;
  }

  login(user: { username: string }): { access_token: string } {
    const payload = { username: user.username, sub: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
