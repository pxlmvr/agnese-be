/*
  Warnings:

  - You are about to drop the `RecipeIngredient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_recipe_id_fkey";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "ingredients" TEXT[];

-- DropTable
DROP TABLE "RecipeIngredient";
