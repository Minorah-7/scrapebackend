import { PrismaService } from '../prisma/prisma.service';
export declare class FavouritesService {
    private prisma;
    constructor(prisma: PrismaService);
    addFavourite(userId: number, productId: number): Promise<{
        id: number;
        productId: number;
        createdAt: Date;
        userId: number;
    }>;
    removeFavourite(userId: number, productId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getFavourites(userId: number): Promise<({
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
}
