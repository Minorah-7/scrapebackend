"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveProductToDB = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const saveProductToDB = async (data) => {
    const sourceId = data.sourceUrl.split('/').pop();
    const existing = await prisma.product.findUnique({ where: { sourceId } });
    if (!existing) {
        await prisma.product.create({
            data: {
                sourceId,
                title: data.title,
                author: data.author,
                price: parseFloat(data.price.replace(/[^\d.]/g, '')),
                currency: 'GBP',
                imageUrl: data.imageUrl,
                sourceUrl: data.sourceUrl,
                category: {
                    connect: { id: 1 }
                },
            },
        });
    }
    else {
        await prisma.product.update({
            where: { sourceId },
            data: {
                title: data.title,
                author: data.author,
                price: parseFloat(data.price.replace(/[^\d.]/g, '')),
                imageUrl: data.imageUrl,
            },
        });
    }
};
exports.saveProductToDB = saveProductToDB;
//# sourceMappingURL=scraperHelpers.js.map