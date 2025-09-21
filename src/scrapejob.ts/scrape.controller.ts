import { Controller, Post, Param, Body } from '@nestjs/common';
import { ScraperService } from './scrape-job.service';

@Controller('scrape')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Post(':categoryId')
  async scrapeCategory(
    @Param('categoryId') categoryId: string,
    @Body('url') url: string,
  ) {
    return this.scraperService.scrapeCategory(parseInt(categoryId, 10), url);
  }
}
