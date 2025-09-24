import { PrismaService } from '../prisma/prisma.service';
export declare class NavigationService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<({
        categories: {
            title: string;
            slug: string;
            url: string | null;
            lastScrapedAt: Date | null;
            id: number;
            navigationId: number;
            parentId: number | null;
            productCount: number;
        }[];
    } & {
        title: string;
        slug: string;
        url: string | null;
        lastScrapedAt: Date | null;
        id: number;
    })[]>;
    scrapeNavigation(): Promise<void>;
}
