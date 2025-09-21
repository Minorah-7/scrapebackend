import { PlaywrightCrawler, Dataset } from 'crawlee';
import { saveProductToDB } from './scraperHelpers';

export const scrapeProduct = async (url: string) => {
    const crawler = new PlaywrightCrawler({
        maxConcurrency: 3,
        requestHandler: async ({ page, request }) => {
            console.log(`Scraping: ${request.url}`);

            const title = await page.$eval('h1', el => el.textContent?.trim());
            const author = await page.$eval('.author', el => el.textContent?.trim());
            const price = await page.$eval('.price', el => el.textContent?.trim());
            const imageUrl = await page.$eval('.product-image img', el => el.getAttribute('src'));
            const description = await page.$eval('.description', el => el.textContent?.trim());

            // Save to DB
            await saveProductToDB({
                title,
                author,
                price,
                imageUrl,
                description,
                sourceUrl: request.url,
            });
        },
        failedRequestHandler: ({ request }) => {
            console.log(`Failed: ${request.url}`);
        },
    });

    await crawler.run([url]);
};
