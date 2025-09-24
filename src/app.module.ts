import { Module } from '@nestjs/common';
import { NavigationModule } from './navigation/navigation.module';
import { CategoryModule } from './category/category.module';
import { PrismaModule } from './prisma/prisma.module';
import { ScraperModule } from './scrapejob.ts/scrape-job.module';
import { ProductController } from './product/product.controller';
import { AuthModule } from './auth/auth.module';
import { FavouritesService } from './favourites/favourites.service';
import { FavouritesController } from './favourites/favourites.controller';
import { ConfigModule } from '@nestjs/config';
import { ReviewsModule } from './review/reviews.module'

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),PrismaModule, NavigationModule, CategoryModule, ScraperModule, AuthModule,ReviewsModule],
  controllers: [ProductController, FavouritesController],
  providers: [FavouritesService],
})
export class AppModule {}
