import { NavigationService } from './navigation.service';
export declare class NavigationController {
    private readonly navService;
    constructor(navService: NavigationService);
    getAll(): Promise<{
        id: number;
        title: string;
        slug: string;
        lastScrapedAt: Date | null;
    }[]>;
}
