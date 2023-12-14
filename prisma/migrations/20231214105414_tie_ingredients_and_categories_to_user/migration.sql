/*
  Warnings:

  - A unique constraint covering the columns `[category_id,belongsToId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ingredient_id,belongsToId]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `belongsToId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `belongsToId` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "belongsToId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "belongsToId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_id_belongsToId_key" ON "Category"("category_id", "belongsToId");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_ingredient_id_belongsToId_key" ON "Ingredient"("ingredient_id", "belongsToId");

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
