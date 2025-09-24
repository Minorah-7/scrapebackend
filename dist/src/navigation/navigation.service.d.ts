import { PrismaService } from '../prisma/prisma.service';
export declare class NavigationService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<({
        categories: {
            id: number;
            title: string;
            slug: string;
            url: string | null;
            lastScrapedAt: Date | null;
            navigationId: number;
            parentId: number | null;
            productCount: number;
        }[];
    } & {
        id: number;
        title: string;
        slug: string;
        url: string | null;
        lastScrapedAt: Date | null;
    })[]>;
    scrapeNavigation(): Promise<void>;
}
