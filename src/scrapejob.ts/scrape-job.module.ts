import { Module } from '@nestjs/common';
import { ScraperService } from '../scrapejob.ts/scrape-job.service'
import { ScraperController } from './scrape.controller'
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ScraperController],
  providers: [ScraperService, PrismaService],
})
export class ScraperModule {}
