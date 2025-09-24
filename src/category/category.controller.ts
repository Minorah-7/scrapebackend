import { Controller, Get, Param, Query,Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { PrismaService } from '../prisma/prisma.service';



@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService,
                private readonly prisma: PrismaService
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
    return this.categoryService.getProductsByCategoryId(
      parseInt(id, 10),
      parseInt(page, 10),
      parseInt(limit, 10),
    );
  }

  
  
}
