import { NavigationService } from './navigation.service';
export declare class NavigationController {
    private readonly navService;
    constructor(navService: NavigationService);
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
    scrapeNav(): Promise<void>;
}
