const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Navigation
  const booksNav = await prisma.navigation.upsert({
    where: { slug: "books" },
    update: {},
    create: { title: "Books", slug: "books" },
  });

  // Categories
  const fiction = await prisma.category.upsert({
    where: { slug: "fiction" },
    update: {},
    create: {
      title: "Fiction",
      slug: "fiction",
      navigationId: booksNav.id,
    },
  });

  const nonFiction = await prisma.category.upsert({
    where: { slug: "non-fiction" },
    update: {},
    create: {
      title: "Non-Fiction",
      slug: "non-fiction",
      navigationId: booksNav.id,
    },
  });

  // Products under Fiction
  await prisma.product.upsert({
    where: { sourceId: "harry-potter" },
    update: {},
    create: {
      sourceId: "harry-potter",
      title: "Harry Potter and the Philosopher’s Stone",
      author: "J.K. Rowling",
      price: 9.99,
      currency: "GBP",
      imageUrl: "https://via.placeholder.com/150",
      sourceUrl: "https://example.com/harry-potter",
      categoryId: fiction.id,
    },
  });

  await prisma.product.upsert({
    where: { sourceId: "lord-of-the-rings" },
    update: {},
    create: {
      sourceId: "lord-of-the-rings",
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      price: 14.99,
      currency: "GBP",
      imageUrl: "https://via.placeholder.com/150",
      sourceUrl: "https://example.com/lotr",
      categoryId: fiction.id,
    },
  });

  // Products under Non-Fiction
  await prisma.product.upsert({
    where: { sourceId: "atomic-habits" },
    update: {},
    create: {
      sourceId: "atomic-habits",
      title: "Atomic Habits",
      author: "James Clear",
      price: 12.99,
      currency: "GBP",
      imageUrl: "https://via.placeholder.com/150",
      sourceUrl: "https://example.com/atomic-habits",
      categoryId: nonFiction.id,
    },
  });


    // Add details to Harry Potter
  const harryPotter = await prisma.product.upsert({
    where: { sourceId: "harry-potter" },
    update: {},
    create: {
      sourceId: "harry-potter",
      title: "Harry Potter and the Philosopher’s Stone",
      author: "J.K. Rowling",
      price: 9.99,
      currency: "GBP",
      imageUrl: "https://via.placeholder.com/150",
      sourceUrl: "https://example.com/harry-potter",
      categoryId: fiction.id,
    },
  });

  await prisma.productDetail.upsert({
  where: { productId: harryPotter.id },
  update: {},
  create: {
    productId: harryPotter.id,
    description: "The first book in the Harry Potter series. Follow Harry as he discovers he is a wizard.",
    isbn: "9780747532699",
    publicationDate: new Date("1997-06-26"),
  },
});


  await prisma.review.createMany({
  data: [
    { productId: harryPotter.id, rating: 5 },
    { productId: harryPotter.id, rating: 4 },
  ],
  skipDuplicates: true,
});


  console.log("✅ Seeded Navigation, Categories, and Products");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
