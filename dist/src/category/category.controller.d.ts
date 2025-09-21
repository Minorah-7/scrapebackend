import { CategoryService } from './category.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class CategoryController {
    private readonly categoryService;
    private readonly prisma;
    constructor(categoryService: CategoryService, prisma: PrismaService);
    getCategories(slug: string): Promise<{
        id: number;
        navigationId: number;
        parentId: number | null;
        title: string;
        slug: string;
        productCount: number;
        lastScrapedAt: Date | null;
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
    getProduct(id: string): Promise<{
        detail: {
            id: number;
            productId: number;
            description: string;
            language: string | null;
            format: string | null;
            isbn: string;
            publicationDate: Date;
        };
        reviews: {
            id: number;
            productId: number;
            rating: number;
        }[];
    } & {
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
}
