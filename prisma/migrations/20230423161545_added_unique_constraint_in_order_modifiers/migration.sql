/*
  Warnings:

  - A unique constraint covering the columns `[restaurant_product_modifier_id,order_line_item_id]` on the table `order_modifiers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `restaurant_product_modifier_id_order_line_item_id` ON `order_modifiers`(`restaurant_product_modifier_id`, `order_line_item_id`);
