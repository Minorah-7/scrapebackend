import { PrismaService } from '../prisma/prisma.service';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
}
export declare class ReviewsController {
    private prisma;
    constructor(prisma: PrismaService);
    getReviews(productId: string): Promise<({
        user: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        productId: number;
        createdAt: Date;
        userId: number;
        rating: number;
        comment: string | null;
    })[]>;
    addReview(req: any, productId: string, body: {
        rating: number;
        comment?: string;
    }): Promise<{
        id: number;
        productId: number;
        createdAt: Date;
        userId: number;
        rating: number;
        comment: string | null;
    }>;
    deleteReview(req: any, id: string): Promise<{
        id: number;
        productId: number;
        createdAt: Date;
        userId: number;
        rating: number;
        comment: string | null;
    }>;
}
export {};
