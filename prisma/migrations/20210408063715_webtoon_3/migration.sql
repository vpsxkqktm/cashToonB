/*
  Warnings:

  - You are about to drop the column `userId` on the `Webtoon` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Webtoon" DROP CONSTRAINT "Webtoon_userId_fkey";

-- AlterTable
ALTER TABLE "Webtoon" DROP COLUMN "userId",
ADD COLUMN     "authorId" INTEGER;

-- AddForeignKey
ALTER TABLE "Webtoon" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
