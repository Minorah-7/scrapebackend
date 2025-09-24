"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScraperService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const playwright_1 = require("@crawlee/playwright");
const schedule_1 = require("@nestjs/schedule");
let ScraperService = class ScraperService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async scrapeCategory(categoryId, url) {
        const requestQueue = await playwright_1.RequestQueue.open();
        await requestQueue.addRequest({ url });
        const books = [];
        const crawler = new playwright_1.PlaywrightCrawler({
            requestQueue,
            maxConcurrency: 3,
            launchContext: {
                launchOptions: {
                    headless: true,
                },
            },
            async requestHandler({ page, request }) {
                console.log('Scraping URL:', request.url);
                try {
                    await page.waitForSelector('a.product-card', { timeout: 15000 });
                    const pageBooks = await page.$$eval('a.product-card', (els) => els.map((el) => {
                        var _a, _b, _c, _d, _e, _f;
                        const title = el.getAttribute('data-item_name') || ((_b = (_a = el.querySelector('h3')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || '';
                        const author = el.getAttribute('data-item_brand') || ((_d = (_c = el.querySelector('.product-card__author')) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim()) || null;
                        const priceAttr = el.getAttribute('data-price');
                        const price = priceAttr ? parseFloat(priceAttr) : null;
                        let imageUrl = ((_e = el.querySelector('img')) === null || _e === void 0 ? void 0 : _e.getAttribute('src')) || ((_f = el.querySelector('img')) === null || _f === void 0 ? void 0 : _f.getAttribute('data-src')) || '';
                        if (imageUrl && !imageUrl.startsWith('http')) {
                            imageUrl = `https://www.worldofbooks.com${imageUrl}`;
                        }
                        const sourceUrl = el.getAttribute('href') || '';
                        const sourceId = el.getAttribute('data-item_ean') || sourceUrl.split('/').pop();
                        return { sourceId, title, author, price, currency: 'GBP', imageUrl, sourceUrl: `https://www.worldofbooks.com${sourceUrl}` };
                    }));
                    console.log('Books found on page:', pageBooks.length);
                    books.push(...pageBooks);
                    await playwright_1.Dataset.pushData(pageBooks);
                }
                catch (err) {
                    console.error('Error scraping page:', err.message);
                }
            },
            failedRequestHandler({ request, error }) {
                console.error(`Request ${request.url} failed too many times:`, error.message);
            },
        });
        await crawler.run();
        console.log('Total books found:', books.length);
        console.log(books.slice(0, 3));
        for (const book of books) {
            try {
                await this.prisma.product.upsert({
                    where: { sourceId: book.sourceId },
                    update: book,
                    create: Object.assign(Object.assign({}, book), { categoryId }),
                });
            }
            catch (err) {
                console.error('DB upsert failed for', book.title, err.message);
            }
        }
        return books;
    }
    async scheduledScrape() {
        console.log('⏰ Running scheduled scrape job...');
        const categories = await this.prisma.category.findMany();
        for (const category of categories) {
            if (!category.url)
                continue;
            try {
                await this.scrapeCategory(category.id, category.url);
                console.log(`✅ Scraped category: ${category.title}`);
            }
            catch (err) {
                console.error(`❌ Failed to scrape ${category.title}:`, err.message);
            }
        }
    }
};
exports.ScraperService = ScraperService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_6_HOURS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScraperService.prototype, "scheduledScrape", null);
exports.ScraperService = ScraperService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ScraperService);
//# sourceMappingURL=scrape-job.service.js.map