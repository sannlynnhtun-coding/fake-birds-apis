import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    private readonly defaultUser;
    constructor(jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
