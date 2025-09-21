export declare class NavigationService {
    getAll(): Promise<{
        id: number;
        title: string;
        slug: string;
        lastScrapedAt: Date | null;
    }[]>;
}
