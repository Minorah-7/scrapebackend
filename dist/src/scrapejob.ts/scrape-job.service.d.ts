import { PrismaService } from '../prisma/prisma.service';
export declare class ScraperService {
    private prisma;
    constructor(prisma: PrismaService);
    scrapeCategory(categoryId: number, url: string): Promise<any[]>;
    scheduledScrape(): Promise<void>;
}
