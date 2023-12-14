/*
  Warnings:

  - A unique constraint covering the columns `[recipe_id,belongsToId]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `belongsToId` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Recipe_name_key";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "belongsToId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_recipe_id_belongsToId_key" ON "Recipe"("recipe_id", "belongsToId");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
