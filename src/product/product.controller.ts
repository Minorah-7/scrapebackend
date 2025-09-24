import { Controller, Get, Param, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller()
export class ProductController {
  constructor(private prisma: PrismaService) {}

  @Get('products/:id/related')
  async getRelated(@Param('id') id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) return [];

    const results = await this.prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        NOT: { id: product.id },
      },
      take: 4,
    });
    console.log(results);
    return results;
  }

  @Get('products/:id')
  async getProduct(@Param('id') id: string) {
    const productId = Number(id);
    if (isNaN(productId)) {
      return null; // or throw new BadRequestException('Invalid product id');
    }
    return this.prisma.product.findUnique({
      where: { id: productId },
    });
  }

  @Get('search')
  async search(@Query('q') q: string) {
    if (!q || q.trim() === '') {
      return [];
    }

    // Only return id and title for autocomplete
    return this.prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { author: { contains: q, mode: 'insensitive' } },
        ],
      },
      take: 5, // smaller result set for autocomplete
      select: { id: true, title: true }, // only return necessary fields
      orderBy: { title: 'asc' },
    });
  }
}
