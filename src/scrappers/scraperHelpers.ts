import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const saveProductToDB = async (data: {
    title: string;
    author: string;
    price: string;
    imageUrl: string;
    description: string;
    sourceUrl: string;
}) => {
    // Extract sourceId from URL
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
                    connect: { id: 1 } // Replace 1 with the actual numeric category id
                },
            },
        });
    } else {
        // Optional: update existing product
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
