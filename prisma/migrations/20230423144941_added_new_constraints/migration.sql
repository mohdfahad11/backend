/*
  Warnings:

  - You are about to alter the column `price` on the `order_modifiers` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,6)` to `Decimal(10,2)`.
  - A unique constraint covering the columns `[order_id,restaurant_product_modifier_id]` on the table `order_modifiers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `order_modifiers` MODIFY `price` DECIMAL(10, 2) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `order_id_restaurant_product_modifier_id` ON `order_modifiers`(`order_id`, `restaurant_product_modifier_id`);
