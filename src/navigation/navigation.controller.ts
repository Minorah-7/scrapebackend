import { Controller, Get, Post } from '@nestjs/common';
import { NavigationService } from './navigation.service';

@Controller('navigation')
export class NavigationController {
  constructor(private readonly navService: NavigationService) {}

  // Get all navigation + categories + children
  @Get()
  async getAll() {
    // ✅ Auto scrape when homepage requests navigation
    await this.navService.scrapeNavigation();
    return this.navService.getAll();
  }

  // Force scrape from WOB
 @Post('scrape')
  async scrapeNav() {
  this.navService.scrapeNavigation().catch(err => console.error(err));
  return { status: 'scraping started' };
}

}
