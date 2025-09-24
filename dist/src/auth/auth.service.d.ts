import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(email: string, password: string, name?: string): Promise<{
        id: number;
        email: string;
        name: string;
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
