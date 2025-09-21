"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeProduct = void 0;
const crawlee_1 = require("crawlee");
const scraperHelpers_1 = require("./scraperHelpers");
const scrapeProduct = async (url) => {
    const crawler = new crawlee_1.PlaywrightCrawler({
        maxConcurrency: 3,
        requestHandler: async ({ page, request }) => {
            console.log(`Scraping: ${request.url}`);
            const title = await page.$eval('h1', el => { var _a; return (_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim(); });
            const author = await page.$eval('.author', el => { var _a; return (_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim(); });
            const price = await page.$eval('.price', el => { var _a; return (_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim(); });
            const imageUrl = await page.$eval('.product-image img', el => el.getAttribute('src'));
            const description = await page.$eval('.description', el => { var _a; return (_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim(); });
            await (0, scraperHelpers_1.saveProductToDB)({
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
exports.scrapeProduct = scrapeProduct;
//# sourceMappingURL=worldOfBooksScraper.js.map