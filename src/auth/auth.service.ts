import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly defaultUser = {
    username: 'bpi',
    password: 'bpi2023',
  };

  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    if (
      username === this.defaultUser.username &&
      password === this.defaultUser.password
    ) {
      const { password, ...result } = this.defaultUser;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

