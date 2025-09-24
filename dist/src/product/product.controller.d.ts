import { PrismaService } from '../prisma/prisma.service';
export declare class ProductController {
    private prisma;
    constructor(prisma: PrismaService);
    getRelated(id: string): Promise<{
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
    }[]>;
    getProduct(id: string): Promise<{
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
    }>;
    search(q: string): Promise<{
        id: number;
        title: string;
    }[]>;
}
