import { PrismaService } from '../prisma/prisma.service';
export declare class NavigationService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<{
        id: number;
        title: string;
        slug: string;
        url: string | null;
        lastScrapedAt: Date | null;
    }[]>;
    scrapeNavigation(): Promise<void>;
}
