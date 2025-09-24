import { CategoryService } from './category.service';
import { PrismaService } from '../prisma/prisma.service';
import { ScraperService } from '../scrapejob.ts/scrape-job.service';
export declare class CategoryController {
    private readonly categoryService;
    private readonly prisma;
    private readonly scraperService;
    constructor(categoryService: CategoryService, prisma: PrismaService, scraperService: ScraperService);
    getCategories(slug: string): Promise<{
        title: string;
        slug: string;
        url: string | null;
        lastScrapedAt: Date | null;
        id: number;
        navigationId: number;
        parentId: number | null;
        productCount: number;
    }[]>;
    getProducts(id: string, page?: string, limit?: string): Promise<{
        title: string;
        lastScrapedAt: Date | null;
        id: number;
        sourceId: string;
        author: string | null;
        price: number | null;
        currency: string | null;
        imageUrl: string | null;
        sourceUrl: string;
        categoryId: number;
    }[]>;
}
