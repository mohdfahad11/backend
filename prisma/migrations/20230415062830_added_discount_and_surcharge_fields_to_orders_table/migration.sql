/*
  Warnings:

  - A unique constraint covering the columns `[seq_no]` on the table `modifier_categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `username` ON `users`;

-- AlterTable
ALTER TABLE `orders` ADD COLUMN `discount` DECIMAL(10, 2) NULL,
    ADD COLUMN `discount_type` TINYINT UNSIGNED NULL,
    ADD COLUMN `surcharge_amount` DECIMAL(10, 2) NULL;

-- AlterTable
ALTER TABLE `quantity_units` MODIFY `unit` VARCHAR(100) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `seq_no` ON `modifier_categories`(`seq_no`);

-- CreateIndex
CREATE INDEX `FK_orders_discount_types` ON `orders`(`discount_type`);

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `FK_orders_discount_types` FOREIGN KEY (`discount_type`) REFERENCES `discount_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
