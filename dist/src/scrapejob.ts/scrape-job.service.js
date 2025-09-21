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
const axios_1 = require("axios");
const cheerio = require("cheerio");
const prisma_service_1 = require("../prisma/prisma.service");
let ScraperService = class ScraperService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async scrapeCategory(categoryId, url) {
        const { data } = await axios_1.default.get(url);
        const $ = cheerio.load(data);
        console.log("Scraping URL:", url);
        const books = [];
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
        for (const book of books) {
            await this.prisma.product.upsert({
                where: { sourceId: book.sourceId },
                update: book,
                create: Object.assign(Object.assign({}, book), { categoryId }),
            });
        }
        console.log("Found books:", books.length);
        console.log(books.slice(0, 3));
        return books;
    }
};
exports.ScraperService = ScraperService;
exports.ScraperService = ScraperService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ScraperService);
//# sourceMappingURL=scrape-job.service.js.map