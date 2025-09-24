import { Controller, Get, Post } from '@nestjs/common';
import { NavigationService } from './navigation.service';

@Controller('navigation')
export class NavigationController {
  constructor(private readonly navService: NavigationService) {}

  @Get()
  async getAll() {
    return this.navService.getAll();
  }

  @Post('scrape')
  async scrapeNav() {
    return this.navService.scrapeNavigation();
  }

  
}
