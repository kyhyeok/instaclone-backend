/*
  Warnings:

  - You are about to drop the column `PhotoId` on the `Like` table. All the data in the column will be lost.
  - Added the required column `photoId` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_PhotoId_fkey";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "PhotoId",
ADD COLUMN     "photoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
