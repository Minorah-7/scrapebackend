const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Navigation
  const booksNav = await prisma.navigation.upsert({
    where: { slug: "books" },
    update: {},
    create: { title: "Books", slug: "books" },
  });

  // Categories with URLs for scraping
  await prisma.category.upsert({
    where: { slug: "fiction" },
    update: {
      url: "https://www.worldofbooks.com/en-gb/collections/fiction-books",
    },
    create: {
      title: "Fiction",
      slug: "fiction",
      url: "https://www.worldofbooks.com/en-gb/collections/fiction-books",
      navigationId: booksNav.id,
    },
  });

  await prisma.category.upsert({
    where: { slug: "non-fiction" },
    update: {
      url: "https://www.worldofbooks.com/en-gb/collections/non-fiction-books",
    },
    create: {
      title: "Non-Fiction",
      slug: "non-fiction",
      url: "https://www.worldofbooks.com/en-gb/collections/non-fiction-books",
      navigationId: booksNav.id,
    },
  });

  console.log("✅ Seeded Navigation and Categories (with scrape URLs)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
