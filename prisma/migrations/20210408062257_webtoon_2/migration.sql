-- AlterTable
ALTER TABLE "Webtoon" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Webtoon" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
