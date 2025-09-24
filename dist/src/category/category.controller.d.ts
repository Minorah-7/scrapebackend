import { CategoryService } from './category.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class CategoryController {
    private readonly categoryService;
    private readonly prisma;
    constructor(categoryService: CategoryService, prisma: PrismaService);
    getCategories(slug: string): Promise<{
        id: number;
        title: string;
        slug: string;
        url: string | null;
        lastScrapedAt: Date | null;
        navigationId: number;
        parentId: number | null;
        productCount: number;
    }[]>;
    getProducts(id: string, page?: string, limit?: string): Promise<{
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
