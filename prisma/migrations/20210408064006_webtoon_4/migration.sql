/*
  Warnings:

  - Made the column `authorId` on table `Webtoon` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Webtoon" ALTER COLUMN "authorId" SET NOT NULL;
