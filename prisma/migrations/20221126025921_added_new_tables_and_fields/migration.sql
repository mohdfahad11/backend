/*
  Warnings:

  - Added the required column `product_id` to the `order_line_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order_line_items` ADD COLUMN `product_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `category_id` SMALLINT UNSIGNED NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `status` TINYINT UNSIGNED NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `cashups` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `restaurant_id` INTEGER UNSIGNED NOT NULL,
    `active_user_id` BIGINT UNSIGNED NOT NULL,
    `witness_user_id` BIGINT UNSIGNED NOT NULL,
    `cashup_date` DATE NOT NULL,
    `float_amount` DECIMAL(6, 2) NOT NULL,
    `eftpos_amount` DECIMAL(6, 2) NOT NULL,
    `till_amount` DECIMAL(6, 2) NOT NULL,
    `safedrop_amount` DECIMAL(6, 2) NOT NULL,
    `expected_eftpos_amount` DECIMAL(6, 2) NOT NULL,
    `expected_till_amount` DECIMAL(6, 2) NOT NULL,
    `expected_float_amount` DECIMAL(6, 2) NOT NULL,
    `note` TEXT NULL,
    `status` TINYINT NOT NULL DEFAULT 0,
    `cashup_done_at` TIMESTAMP(0) NOT NULL,
    `created_by` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` BIGINT UNSIGNED NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `FK_cashups_restaurants`(`restaurant_id`),
    INDEX `FK_cashups_users`(`active_user_id`),
    INDEX `FK_cashups_users_2`(`witness_user_id`),
    INDEX `FK_cashups_users_3`(`created_by`),
    INDEX `FK_cashups_users__4`(`updated_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(200) NOT NULL,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_gateways` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `gateway` VARCHAR(150) NOT NULL,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `gateway`(`gateway`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurant_payment_gateway_settings` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `restaurant_id` INTEGER UNSIGNED NOT NULL,
    `payment_gateway_id` SMALLINT UNSIGNED NOT NULL,
    `merchant_id` VARCHAR(100) NULL,
    `has_integrated_surcharge` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `has_integrated_receipt` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `created_by` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` BIGINT UNSIGNED NULL,
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `FK_restaurant_payment_gateway_settings_payment_gateways`(`payment_gateway_id`),
    INDEX `FK_restaurant_payment_gateway_settings_restaurants`(`restaurant_id`),
    INDEX `FK_restaurant_payment_gateway_settings_users`(`created_by`),
    INDEX `FK_restaurant_payment_gateway_settings_users_2`(`updated_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurant_settings` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `restaurant_id` INTEGER UNSIGNED NOT NULL,
    `product_vendor_name` VARCHAR(300) NULL,
    `product_name` VARCHAR(300) NULL,
    `product_version` VARCHAR(30) NULL,
    `site_reference` VARCHAR(200) NULL,
    `address_line_1` VARCHAR(500) NULL,
    `address_line_2` VARCHAR(500) NULL,
    `show_product_offer_popup` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `gst_tax_rate` DECIMAL(8, 2) NOT NULL,
    `gst_ratio` DECIMAL(8, 2) NOT NULL,
    `expected_floating_amount` DECIMAL(8, 2) NOT NULL,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `created_by` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` BIGINT UNSIGNED NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `restaurant_id`(`restaurant_id`),
    INDEX `FK_restaurant_settings_users`(`created_by`),
    INDEX `FK_restaurant_settings_users_1`(`updated_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `FK_order_line_items_products` ON `order_line_items`(`product_id`);

-- CreateIndex
CREATE INDEX `FK_products_categories` ON `products`(`category_id`);

-- AddForeignKey
ALTER TABLE `order_line_items` ADD CONSTRAINT `FK_order_line_items_products` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `FK_products_categories` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cashups` ADD CONSTRAINT `FK_cashups_restaurants` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cashups` ADD CONSTRAINT `FK_cashups_users` FOREIGN KEY (`active_user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cashups` ADD CONSTRAINT `FK_cashups_users_2` FOREIGN KEY (`witness_user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cashups` ADD CONSTRAINT `FK_cashups_users_3` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cashups` ADD CONSTRAINT `FK_cashups_users__4` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_payment_gateway_settings` ADD CONSTRAINT `FK_restaurant_payment_gateway_settings_payment_gateways` FOREIGN KEY (`payment_gateway_id`) REFERENCES `payment_gateways`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_payment_gateway_settings` ADD CONSTRAINT `FK_restaurant_payment_gateway_settings_restaurants` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_payment_gateway_settings` ADD CONSTRAINT `FK_restaurant_payment_gateway_settings_users` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_payment_gateway_settings` ADD CONSTRAINT `FK_restaurant_payment_gateway_settings_users_2` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_settings` ADD CONSTRAINT `FK_restaurant_settings_restaurants` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_settings` ADD CONSTRAINT `FK_restaurant_settings_users` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_settings` ADD CONSTRAINT `FK_restaurant_settings_users_1` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
