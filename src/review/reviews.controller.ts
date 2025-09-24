import { Controller, Post, Get, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthGuard } from '@nestjs/passport';

// Create a JWT authentication guard by extending the AuthGuard
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Controller('reviews')
@UseGuards(JwtAuthGuard)
export class ReviewsController {
  constructor(private prisma: PrismaService) {}

  // Get reviews for a product
  @Get('product/:productId')
  async getReviews(@Param('productId') productId: string) {
    return this.prisma.review.findMany({
      where: { productId: Number(productId) },
      include: { user: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Add a review
  @Post(':productId')
  async addReview(
    @Req() req,
    @Param('productId') productId: string,
    @Body() body: { rating: number; comment?: string },
  ) {
    return this.prisma.review.create({
      data: {
        rating: body.rating,
        comment: body.comment,
        userId: req.user.id,
        productId: Number(productId),
      },
    });
  }

  // Delete review
  @Delete(':id')
  async deleteReview(@Req() req, @Param('id') id: string) {
    const review = await this.prisma.review.findUnique({ where: { id: Number(id) } });
    if (review?.userId !== req.user.id) {
      throw new Error('Unauthorized to delete this review');
    }
    return this.prisma.review.delete({ where: { id: Number(id) } });
  }
}
