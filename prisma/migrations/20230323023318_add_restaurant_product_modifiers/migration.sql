/*
  Warnings:

  - You are about to drop the `product_modifier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `product_modifier` DROP FOREIGN KEY `FK_product_modifier_users`;

-- DropForeignKey
ALTER TABLE `product_modifier` DROP FOREIGN KEY `FK_product_modifier_users_2`;

-- DropForeignKey
ALTER TABLE `product_modifier` DROP FOREIGN KEY `FK_product_modifiers_modifiers`;

-- DropForeignKey
ALTER TABLE `product_modifier` DROP FOREIGN KEY `FK_product_modifiers_products`;

-- AlterTable
ALTER TABLE `modifier_categories` ADD COLUMN `is_mandatory` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    ADD COLUMN `is_single_select` TINYINT UNSIGNED NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `product_modifier`;

-- CreateTable
CREATE TABLE `restaurant_product_modifiers` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `restaurant_product_id` BIGINT UNSIGNED NOT NULL,
    `modifier_id` INTEGER UNSIGNED NOT NULL,
    `price` DECIMAL(6, 2) NOT NULL,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `created_by` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` BIGINT UNSIGNED NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `FK_restaurant_product_modifiers_modifiers`(`modifier_id`),
    INDEX `FK_restaurant_product_modifiers_users`(`created_by`),
    INDEX `FK_restaurant_product_modifiers_users_2`(`updated_by`),
    UNIQUE INDEX `restaurant_product_id_modifier_id`(`restaurant_product_id`, `modifier_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `restaurant_product_modifiers` ADD CONSTRAINT `FK_restaurant_product_modifiers_modifiers` FOREIGN KEY (`modifier_id`) REFERENCES `modifiers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_product_modifiers` ADD CONSTRAINT `FK_restaurant_product_modifiers_restaurant_modifiers` FOREIGN KEY (`restaurant_product_id`) REFERENCES `restaurant_products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_product_modifiers` ADD CONSTRAINT `FK_restaurant_product_modifiers_users` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_product_modifiers` ADD CONSTRAINT `FK_restaurant_product_modifiers_users_2` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
