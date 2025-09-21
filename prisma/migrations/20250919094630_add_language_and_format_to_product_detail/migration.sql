/*
  Warnings:

  - You are about to drop the column `ratingsAvg` on the `ProductDetail` table. All the data in the column will be lost.
  - You are about to drop the column `reviewsCount` on the `ProductDetail` table. All the data in the column will be lost.
  - You are about to drop the column `specs` on the `ProductDetail` table. All the data in the column will be lost.
  - Added the required column `isbn` to the `ProductDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicationDate` to the `ProductDetail` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `ProductDetail` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProductDetail" DROP COLUMN "ratingsAvg",
DROP COLUMN "reviewsCount",
DROP COLUMN "specs",
ADD COLUMN     "format" TEXT,
ADD COLUMN     "isbn" TEXT NOT NULL,
ADD COLUMN     "publicationDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
