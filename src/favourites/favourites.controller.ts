import { Controller, Post, Delete, Get, Param, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Create a JWT authentication guard by extending the AuthGuard
export class JwtAuthGuard extends AuthGuard('jwt') {}
import { PrismaService } from '../prisma/prisma.service';

@Controller('favourites')
@UseGuards(JwtAuthGuard)
export class FavouritesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getUserFavourites(@Req() req) {
    return this.prisma.favourite.findMany({
      where: { userId: req.user.id },
      include: { product: true },
    });
  }

  @Post(':productId')
  async addFavourite(@Req() req, @Param('productId') productId: string) {
    return this.prisma.favourite.upsert({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId: Number(productId),
        },
      },
      update: {},
      create: {
        userId: req.user.id,
        productId: Number(productId),
      },
    });
  }

  @Delete(':productId')
  async removeFavourite(@Req() req, @Param('productId') productId: string) {
    return this.prisma.favourite.delete({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId: Number(productId),
        },
      },
    });
  }
}
