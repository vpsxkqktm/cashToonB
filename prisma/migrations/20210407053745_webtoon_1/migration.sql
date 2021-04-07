-- CreateTable
CREATE TABLE "Webtoon" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "files" TEXT[],
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);
