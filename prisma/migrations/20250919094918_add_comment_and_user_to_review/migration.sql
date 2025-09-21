/*
  Warnings:

  - You are about to drop the column `author` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Review` table. All the data in the column will be lost.
  - Made the column `rating` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "author",
DROP COLUMN "createdAt",
DROP COLUMN "text",
ALTER COLUMN "rating" SET NOT NULL,
ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;
