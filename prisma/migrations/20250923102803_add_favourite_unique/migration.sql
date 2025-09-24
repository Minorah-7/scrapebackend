/*
  Warnings:

  - A unique constraint covering the columns `[userId,productId]` on the table `Favourite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Favourite_userId_productId_key" ON "Favourite"("userId", "productId");
