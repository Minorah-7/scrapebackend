import { Module } from '@nestjs/common';
import { NavigationModule } from './navigation/navigation.module';
import { CategoryModule } from './category/category.module';
import { PrismaModule } from './prisma/prisma.module';
import { ScraperModule } from './scrapejob.ts/scrape-job.module';

@Module({
  imports: [PrismaModule, NavigationModule, CategoryModule, ScraperModule ],
})
export class AppModule {}
