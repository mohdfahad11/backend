/*
  Warnings:

  - You are about to drop the column `order_id` on the `order_modifiers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[restaurant_product_modifier_id]` on the table `order_modifiers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_line_item_id` to the `order_modifiers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order_modifiers` DROP FOREIGN KEY `FK_order_modifiers_orders`;

-- DropIndex
DROP INDEX `order_id_restaurant_product_modifier_id` ON `order_modifiers`;

-- AlterTable
ALTER TABLE `order_modifiers` DROP COLUMN `order_id`,
    ADD COLUMN `order_line_item_id` BIGINT UNSIGNED NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `order_id_restaurant_product_modifier_id` ON `order_modifiers`(`restaurant_product_modifier_id`);

-- CreateIndex
CREATE INDEX `FK_order_modifiers_order_line_items` ON `order_modifiers`(`order_line_item_id`);

-- AddForeignKey
ALTER TABLE `order_modifiers` ADD CONSTRAINT `FK_order_modifiers_order_line_items` FOREIGN KEY (`order_line_item_id`) REFERENCES `order_line_items`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
