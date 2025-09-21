import { PrismaService } from '../prisma/prisma.service';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    getCategoriesByNavigationSlug(slug: string): Promise<{
        id: number;
        navigationId: number;
        parentId: number | null;
        title: string;
        slug: string;
        productCount: number;
        lastScrapedAt: Date | null;
    }[]>;
    getProductsByCategoryId(categoryId: number, page?: number, limit?: number): Promise<{
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
}
