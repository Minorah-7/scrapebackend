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
exports.NavigationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const playwright_1 = require("@crawlee/playwright");
let NavigationService = class NavigationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll() {
        return this.prisma.navigation.findMany({
            include: {
                categories: true,
            },
        });
    }
    async scrapeNavigation() {
        const self = this;
        const requestQueue = await playwright_1.RequestQueue.open();
        await requestQueue.addRequest({ url: 'https://www.worldofbooks.com/en-gb' });
        const crawler = new playwright_1.PlaywrightCrawler({
            requestQueue,
            launchContext: {
                launchOptions: { headless: true },
            },
            async requestHandler({ page }) {
                console.log('🌍 Scraping navigation…');
                const navBlocks = await page.$$('li.has-submenu');
                for (const block of navBlocks) {
                    const nav = await block.$eval('a.header__menu-item', (el) => {
                        var _a, _b;
                        return ({
                            title: ((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '',
                            url: el.href || el.getAttribute('href') || null,
                            slug: ((_b = el.textContent) === null || _b === void 0 ? void 0 : _b.trim().toLowerCase().replace(/\s+/g, '-')) || '',
                        });
                    });
                    if (!nav.title)
                        continue;
                    const dbNav = await self.prisma.navigation.upsert({
                        where: { slug: nav.slug },
                        update: { title: nav.title, url: nav.url },
                        create: { title: nav.title, slug: nav.slug, url: nav.url },
                    });
                    const subcategories = await block.$$eval('div.onstate-mega-menu__submenu ul.list-menu a', (els) => els.map((el) => {
                        var _a, _b;
                        return ({
                            title: ((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '',
                            url: el.href || el.getAttribute('href') || null,
                            slug: ((_b = el.textContent) === null || _b === void 0 ? void 0 : _b.trim().toLowerCase().replace(/\s+/g, '-')) || '',
                        });
                    }));
                    for (const cat of subcategories) {
                        if (!cat.title)
                            continue;
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
};
exports.NavigationService = NavigationService;
exports.NavigationService = NavigationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NavigationService);
//# sourceMappingURL=navigation.service.js.map