import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlaywrightCrawler, RequestQueue } from '@crawlee/playwright';

@Injectable()
export class NavigationService {
  
  constructor(private prisma: PrismaService) {}

  async getAll() {
   return this.prisma.navigation.findMany();
  }

  async scrapeNavigation() {
    const requestQueue = await RequestQueue.open();
    await requestQueue.addRequest({ url: 'https://www.worldofbooks.com/en-gb' });

    const crawler = new PlaywrightCrawler({
      requestQueue,
      launchContext: {
        launchOptions: { headless: true },
      },
      async requestHandler({ page }) {
        console.log('🌍 Scraping navigation…');

        // Top-level menu items
        const navItems = await page.$$eval(
          'li.has-submenu > a.header__menu-item',
          (els) =>
            els.map((el) => ({
              title: el.textContent?.trim() || '',
              url:
                (el as HTMLAnchorElement).href ||
                el.getAttribute('href') ||
                null,
              slug:
                el.textContent
                  ?.trim()
                  .toLowerCase()
                  .replace(/\s+/g, '-') || '',
            })),
        );

        for (const nav of navItems) {
          if (!nav.title) continue;

          // Save navigation
          const dbNav = await this.prisma.navigation.upsert({
            where: { slug: nav.slug },
            update: { title: nav.title, url: nav.url },
            create: { title: nav.title, slug: nav.slug, url: nav.url },
          });

          // Grab subcategories for each navigation
          const subcategories = await page.$$eval(
            `a[aria-controls*="${nav.title}"] ~ div ul.list-menu a`,
            (els) =>
              els.map((el) => ({
                title: el.textContent?.trim() || '',
                url:
                  (el as HTMLAnchorElement).href ||
                  el.getAttribute('href') ||
                  null,
                slug:
                  el.textContent
                    ?.trim()
                    .toLowerCase()
                    .replace(/\s+/g, '-') || '',
              })),
          );

          for (const cat of subcategories) {
            if (!cat.title) continue;

            const dbCat = await this.prisma.category.upsert({
              where: { slug: cat.slug },
              update: { title: cat.title, url: cat.url },
              create: {
                title: cat.title,
                slug: cat.slug,
                url: cat.url,
                navigationId: dbNav.id,
              },
            });
          }
        }
      },
    });

    await crawler.run();

    console.log('✅ Navigation & categories scraped!');
  }
}
