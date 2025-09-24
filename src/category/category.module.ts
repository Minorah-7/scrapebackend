import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ScraperModule } from '../scrapejob.ts/scrape-job.module'; // <-- Import ScraperModule

@Module({
  imports: [ScraperModule], // <-- Add ScraperModule to imports
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
})
export class CategoryModule {}
