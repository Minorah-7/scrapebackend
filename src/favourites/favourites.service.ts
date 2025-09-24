import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavouritesService {
  constructor(private prisma: PrismaService) {}

  async addFavourite(userId: number, productId: number) {
    return this.prisma.favourite.create({
      data: { userId, productId },
    });
  }

  async removeFavourite(userId: number, productId: number) {
    return this.prisma.favourite.deleteMany({
      where: { userId, productId },
    });
  }

  async getFavourites(userId: number) {
    return this.prisma.favourite.findMany({
      where: { userId },
      include: { product: true },
    });
  }
}
