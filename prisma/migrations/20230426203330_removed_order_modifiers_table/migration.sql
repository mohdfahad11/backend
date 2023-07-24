/*
  Warnings:

  - You are about to drop the `order_modifiers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `order_modifiers` DROP FOREIGN KEY `FK_order_modifiers_order_line_items`;

-- DropForeignKey
ALTER TABLE `order_modifiers` DROP FOREIGN KEY `FK_order_modifiers_restaurant_product_modifiers`;

-- DropTable
DROP TABLE `order_modifiers`;
