/*
  Warnings:

  - A unique constraint covering the columns `[hashtah]` on the table `Hashtag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Hashtag.hashtah_unique" ON "Hashtag"("hashtah");
