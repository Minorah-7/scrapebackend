import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getCategoriesByNavigationSlug(slug: string) {
    return this.prisma.category.findMany({
      where: {
        navigation: { slug },
      },
    });
  }

  async getProductsByCategoryId(categoryId: number, page = 1, limit = 10) {
    return this.prisma.product.findMany({
      where: { categoryId },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}
