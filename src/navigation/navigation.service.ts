import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlaywrightCrawler, RequestQueue } from '@crawlee/playwright';

@Injectable()
export class NavigationService {
  
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.navigation.findMany({
      include: {
        categories: true, // include categories without children
      },
    });
  }

  async scrapeNavigation() {
    const self = this; // capture this

    const requestQueue = await RequestQueue.open();
    await requestQueue.addRequest({ url: 'https://www.worldofbooks.com/en-gb' });
    if (process.env.NODE_ENV === 'production') {
      console.warn(`⚠️ Skipping actual scraping on Railway for category navigation.`);
      return [];
    }
    const crawler = new PlaywrightCrawler({
      requestQueue,
      launchContext: {
        launchOptions: { headless: true },
      },
      async requestHandler({ page }) {
        console.log('🌍 Scraping navigation…');

        const navBlocks = await page.$$('li.has-submenu');

        for (const block of navBlocks) {
          const nav = await block.$eval('a.header__menu-item', (el) => ({
            title: el.textContent?.trim() || '',
            url: (el as HTMLAnchorElement).href || el.getAttribute('href') || null,
            slug:
              el.textContent?.trim().toLowerCase().replace(/\s+/g, '-') || '',
          }));

          if (!nav.title) continue;

          // Save top-level nav
          const dbNav = await self.prisma.navigation.upsert({
            where: { slug: nav.slug },
            update: { title: nav.title, url: nav.url },
            create: { title: nav.title, slug: nav.slug, url: nav.url },
          });

          // Now get subcategories inside this block
          const subcategories = await block.$$eval(
            'div.onstate-mega-menu__submenu ul.list-menu a',
            (els) =>
              els.map((el) => ({
                title: el.textContent?.trim() || '',
                url: (el as HTMLAnchorElement).href || el.getAttribute('href') || null,
                slug:
                  el.textContent?.trim().toLowerCase().replace(/\s+/g, '-') || '',
              })),
          );

          for (const cat of subcategories) {
            if (!cat.title) continue;

            await self.prisma.category.upsert({
              where: { slug: cat.slug },
              update: { title: cat.title, url: cat.url, navigationId: dbNav.id },
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
