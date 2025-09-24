import { NavigationService } from './navigation.service';
export declare class NavigationController {
    private readonly navService;
    constructor(navService: NavigationService);
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
    scrapeNav(): Promise<void>;
}
