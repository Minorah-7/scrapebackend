import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class NavigationService {
  async getAll() {
    return prisma.navigation.findMany();
  }
}
