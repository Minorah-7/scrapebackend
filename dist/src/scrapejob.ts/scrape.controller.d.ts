import { ScraperService } from './scrape-job.service';
export declare class ScraperController {
    private readonly scraperService;
    constructor(scraperService: ScraperService);
    scrapeCategory(categoryId: string, url: string): Promise<any[]>;
}
