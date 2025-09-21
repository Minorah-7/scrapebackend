import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScraperService {
  constructor(private prisma: PrismaService) {}

  async scrapeCategory(categoryId: number, url: string) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    console.log("Scraping URL:", url);


    const books: any[] = [];

    $(".product-card").each((_, el) => {
  const title = $(el).find(".product-card__title").text().trim();
  const author = $(el).find(".product-card__author").text().trim();
  const priceText = $(el).find(".price").text().trim().replace("£", "");
  const price = parseFloat(priceText) || null;
  const imageUrl = $(el).find("img").attr("src") || "";
  const sourceUrl = $(el).find("a").attr("href") || "";
  const sourceId = sourceUrl.split("/").pop() || title;

  books.push({
    sourceId,
    title,
    author,
    price,
    currency: "GBP",
    imageUrl,
    sourceUrl: `https://www.worldofbooks.com${sourceUrl}`,
  });
});


    // Upsert into DB
    for (const book of books) {
      await this.prisma.product.upsert({
        where: { sourceId: book.sourceId },
        update: book,
        create: { ...book, categoryId },
      });
    }

    console.log("Found books:", books.length);
    console.log(books.slice(0, 3)); // show first 3


    return books;
  }
}
