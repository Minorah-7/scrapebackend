declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
}
import { PrismaService } from '../prisma/prisma.service';
export declare class FavouritesController {
    private prisma;
    constructor(prisma: PrismaService);
    getUserFavourites(req: any): Promise<({
        product: {
            id: number;
            title: string;
            lastScrapedAt: Date | null;
            sourceId: string;
            author: string | null;
            price: number | null;
            currency: string | null;
            imageUrl: string | null;
            sourceUrl: string;
            categoryId: number;
        };
    } & {
        id: number;
        productId: number;
        createdAt: Date;
        userId: number;
    })[]>;
    addFavourite(req: any, productId: string): Promise<{
        id: number;
        productId: number;
        createdAt: Date;
        userId: number;
    }>;
    removeFavourite(req: any, productId: string): Promise<{
        id: number;
        productId: number;
        createdAt: Date;
        userId: number;
    }>;
}
export {};
