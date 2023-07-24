/*
  Warnings:

  - Added the required column `restaurant_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `abn` to the `restaurant_settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurant_unique_id` to the `restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `username` ON `users`;

-- AlterTable
ALTER TABLE `cashups` MODIFY `active_user_id` BIGINT UNSIGNED NULL,
    MODIFY `witness_user_id` BIGINT UNSIGNED NULL;

-- AlterTable
ALTER TABLE `orders` ADD COLUMN `delivery_time_hrs` INTEGER UNSIGNED NULL,
    ADD COLUMN `restaurant_id` INTEGER UNSIGNED NOT NULL,
    ADD COLUMN `waiting_time_hrs` INTEGER UNSIGNED NULL;

-- AlterTable
ALTER TABLE `restaurant_settings` ADD COLUMN `abn` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `restaurants` ADD COLUMN `alternate_phone` VARCHAR(20) NULL,
    ADD COLUMN `phone` VARCHAR(20) NULL,
    ADD COLUMN `restaurant_unique_id` VARCHAR(50) NOT NULL;

-- CreateTable
CREATE TABLE `advance_cashes` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `restaurant_id` INTEGER UNSIGNED NOT NULL,
    `date` DATETIME(0) NOT NULL,
    `active_user_id` BIGINT UNSIGNED NULL,
    `witness_user_id` BIGINT UNSIGNED NULL,
    `advance_amount` DOUBLE NOT NULL,
    `expected_float_amount` DOUBLE NOT NULL,
    `note` TEXT NULL,
    `created_by` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_by` BIGINT UNSIGNED NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `FK_advance_cashes_restaurants`(`restaurant_id`),
    INDEX `FK_advance_cashes_users`(`active_user_id`),
    INDEX `FK_advance_cashes_users_2`(`witness_user_id`),
    INDEX `FK_advance_cashes_users_3`(`created_by`),
    INDEX `FK_advance_cashes_users_4`(`updated_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_modifiers` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_id` BIGINT UNSIGNED NOT NULL,
    `restaurant_product_modifier_id` BIGINT UNSIGNED NOT NULL,
    `price` DECIMAL(10, 6) NOT NULL,

    INDEX `FK_order_modifiers_orders`(`order_id`),
    INDEX `FK_order_modifiers_restaurant_product_modifiers`(`restaurant_product_modifier_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `FK_orders_restaurants` ON `orders`(`restaurant_id`);

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `FK_orders_restaurants` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `advance_cashes` ADD CONSTRAINT `FK_advance_cashes_restaurants` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `advance_cashes` ADD CONSTRAINT `FK_advance_cashes_users` FOREIGN KEY (`active_user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `advance_cashes` ADD CONSTRAINT `FK_advance_cashes_users_2` FOREIGN KEY (`witness_user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `advance_cashes` ADD CONSTRAINT `FK_advance_cashes_users_3` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `advance_cashes` ADD CONSTRAINT `FK_advance_cashes_users_4` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_modifiers` ADD CONSTRAINT `FK_order_modifiers_orders` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_modifiers` ADD CONSTRAINT `FK_order_modifiers_restaurant_product_modifiers` FOREIGN KEY (`restaurant_product_modifier_id`) REFERENCES `restaurant_product_modifiers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
