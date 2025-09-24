import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlaywrightCrawler, Dataset, RequestQueue } from '@crawlee/playwright';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ScraperService {
  constructor(private prisma: PrismaService) {}

  async scrapeCategory(categoryId: number, url: string) {
    const requestQueue = await RequestQueue.open();
    await requestQueue.addRequest({ url });

    const books: any[] = [];

    const crawler = new PlaywrightCrawler({
      requestQueue,
      maxConcurrency: 3, // adjust based on server resources
      launchContext: {
        launchOptions: {
          headless: true,
        },
      },
      async requestHandler({ page, request }) {
        console.log('Scraping URL:', request.url);

        try {
          // Wait for book cards to appear
          await page.waitForSelector('a.product-card', { timeout: 15000 });

          // Extract books from the page
          const pageBooks = await page.$$eval('a.product-card', (els) =>
            els.map((el) => {
              const title = el.getAttribute('data-item_name') || el.querySelector('h3')?.textContent?.trim() || '';
              const author =
                el.getAttribute('data-item_brand') || el.querySelector('.product-card__author')?.textContent?.trim() || null;

              const priceAttr = el.getAttribute('data-price');
              const price = priceAttr ? parseFloat(priceAttr) : null;

              let imageUrl = el.querySelector('img')?.getAttribute('src') || el.querySelector('img')?.getAttribute('data-src') || '';
              if (imageUrl && !imageUrl.startsWith('http')) {
                imageUrl = `https://www.worldofbooks.com${imageUrl}`;
              }

              const sourceUrl = el.getAttribute('href') || '';
              const sourceId = el.getAttribute('data-item_ean') || sourceUrl.split('/').pop();

              return { sourceId, title, author, price, currency: 'GBP', imageUrl, sourceUrl: `https://www.worldofbooks.com${sourceUrl}` };
            }),
          );

          console.log('Books found on page:', pageBooks.length);

          books.push(...pageBooks);

          // Optionally save to Dataset (Crawlee’s built-in persistence)
          await Dataset.pushData(pageBooks);
        } catch (err) {
          console.error('Error scraping page:', err.message);
        }
      },
      failedRequestHandler({ request, error }) {
        console.error(`Request ${request.url} failed too many times:`, (error as Error).message);
      },
    });

    await crawler.run();

    console.log('Total books found:', books.length);
    console.log(books.slice(0, 3));

    // Upsert into DB
    for (const book of books) {
      try {
        await this.prisma.product.upsert({
          where: { sourceId: book.sourceId },
          update: book,
          create: { ...book, categoryId },
        });
      } catch (err) {
        console.error('DB upsert failed for', book.title, err.message);
      }
    }

    return books;
  }


  @Cron(CronExpression.EVERY_6_HOURS)
  async scheduledScrape() {
    console.log('⏰ Running scheduled scrape job...');

    // Get all categories from DB
    const categories = await this.prisma.category.findMany();

    for (const category of categories) {
      if (!category.url) continue; // ensure we have a URL saved
      try {
        await this.scrapeCategory(category.id, category.url);
        console.log(`✅ Scraped category: ${category.title}`);
      } catch (err) {
        console.error(`❌ Failed to scrape ${category.title}:`, err.message);
      }
    }
  }
}
