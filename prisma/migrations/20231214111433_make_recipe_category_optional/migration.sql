-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_category_id_fkey";

-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "category_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;
