import { Controller, Get, Param, Query,Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { PrismaService } from '../prisma/prisma.service';
import { ScraperService } from '../scrapejob.ts/scrape-job.service';



@Controller()
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly prisma: PrismaService,
    private readonly scraperService: ScraperService // Inject ScraperService
  ) {}

  @Get('navigation/:slug/categories')
  async getCategories(@Param('slug') slug: string) {
    return this.categoryService.getCategoriesByNavigationSlug(slug);
  }

  @Get('categories/:id/products')
  async getProducts(
    @Param('id') id: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    const categoryId = parseInt(id, 10);
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    let products = await this.categoryService.getProductsByCategoryId(categoryId, pageNum, limitNum);
    if (products.length === 0) {
      // Get category URL
      const category = await this.prisma.category.findUnique({ where: { id: categoryId } });
      if (category?.url) {
        await this.scraperService.scrapeCategory(categoryId, category.url);
        products = await this.categoryService.getProductsByCategoryId(categoryId, pageNum, limitNum);
      }
    }
    return products;
  }
  
  
  
}
