-- CreateTable
CREATE TABLE `addresses` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `address_type` TINYINT UNSIGNED NOT NULL,
    `module_type` TINYINT UNSIGNED NOT NULL,
    `module_id` BIGINT UNSIGNED NOT NULL,
    `country_id` SMALLINT UNSIGNED NOT NULL,
    `province_id` SMALLINT UNSIGNED NULL,
    `city_id` INTEGER UNSIGNED NULL,
    `unit_number` VARCHAR(30) NULL,
    `street_name` VARCHAR(100) NULL,
    `postcode` VARCHAR(255) NOT NULL,
    `latitude` VARCHAR(30) NULL,
    `longitude` VARCHAR(30) NULL,
    `phone` VARCHAR(20) NULL,
    `alternate_phone` VARCHAR(20) NULL,
    `created_by` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` BIGINT UNSIGNED NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `FK_addresses_users`(`created_by`),
    INDEX `FK_addresses_users_2`(`updated_by`),
    UNIQUE INDEX `address_type_module_type_module_id`(`address_type`, `module_type`, `module_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attachments` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `attachment_type` TINYINT UNSIGNED NULL,
    `module_type` TINYINT UNSIGNED NOT NULL,
    `module_id` BIGINT UNSIGNED NOT NULL,
    `original_file_name` VARCHAR(255) NOT NULL,
    `extension` VARCHAR(100) NOT NULL,
    `upload_path` VARCHAR(255) NULL,
    `mime_type` VARCHAR(100) NOT NULL,
    `status` ENUM('Uploaded', 'Deleted') NOT NULL DEFAULT 'Uploaded',
    `created_by` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` BIGINT UNSIGNED NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_by` BIGINT UNSIGNED NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `FK_attachments_users`(`created_by`),
    INDEX `FK_attachments_users_2`(`updated_by`),
    INDEX `FK_attachments_users_3`(`deleted_by`),
    UNIQUE INDEX `attachment_type_module_type_module_id`(`attachment_type`, `module_type`, `module_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cuisines` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `status` TINYINT UNSIGNED NULL DEFAULT 1,
    `created_by` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` BIGINT UNSIGNED NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `FK_cuisines_users`(`created_by`),
    INDEX `FK_cuisines_users_2`(`updated_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_line_items` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_id` BIGINT UNSIGNED NOT NULL,
    `table_id` SMALLINT UNSIGNED NULL,
    `expected_date_time` DATETIME(0) NULL,
    `quantity` TINYINT UNSIGNED NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `line_item_total` DECIMAL(10, 2) NOT NULL,
    `total_amount` DECIMAL(10, 2) NOT NULL,
    `rating` DECIMAL(10, 2) NULL,
    `note` VARCHAR(500) NULL,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `created_by` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` BIGINT UNSIGNED NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `FK_order_line_items_orders`(`order_id`),
    INDEX `FK_order_line_items_restaurant_tables`(`table_id`),
    INDEX `FK_order_line_items_users`(`created_by`),
    INDEX `FK_order_line_items_users_1`(`updated_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_payment_methods` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `payment_method_id` SMALLINT UNSIGNED NOT NULL,
    `order_id` BIGINT UNSIGNED NOT NULL,
    `amount_paid` DECIMAL(6, 2) NOT NULL,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `created_by` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` BIGINT UNSIGNED NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `FK_order_payment_methods_orders`(`order_id`),
    INDEX `FK_order_payment_methods_payment_methods`(`payment_method_id`),
    INDEX `FK_order_payment_methods_users`(`created_by`),
    INDEX `FK_order_payment_methods_users_2`(`updated_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_refunds` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_line_item_id` BIGINT UNSIGNED NOT NULL,
    `type` TINYINT UNSIGNED NOT NULL,
    `refund_reason` VARCHAR(500) NULL,
    `refunded_by` BIGINT UNSIGNED NOT NULL,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `created_by` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` BIGINT UNSIGNED NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `FK_order_refunds_order_line_items`(`order_line_item_id`),
    INDEX `FK_order_refunds_refund_types`(`type`),
    INDEX `FK_order_refunds_users`(`refunded_by`),
    INDEX `FK_order_refunds_users_2`(`created_by`),
    INDEX `FK_order_refunds_users_3`(`updated_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_types` (
    `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(200) NOT NULL,
    `status` TINYINT UNSIGNED NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` TINYINT UNSIGNED NOT NULL,
    `customer_name` VARCHAR(50) NULL,
    `customer_email` VARCHAR(250) NULL,
    `customer_phone_number` VARCHAR(10) NULL,
    `ordered_at` DATETIME(0) NULL,
    `total_amount` DECIMAL(10, 2) NULL,
    `note` VARCHAR(500) NULL,
    `rating` DECIMAL(10, 2) NULL,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `ordered_by` BIGINT UNSIGNED NULL,
    `created_by` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` BIGINT UNSIGNED NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `FK_orders_order_types`(`type`),
    INDEX `FK_orders_users`(`ordered_by`),
    INDEX `FK_orders_users_2`(`created_by`),
    INDEX `FK_orders_users_3`(`updated_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `outlets` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `status` TINYINT UNSIGNED NULL DEFAULT 1,
    `created_by` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` BIGINT UNSIGNED NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `FK_outlets_users`(`created_by`),
    INDEX `FK_outlets_users_2`(`updated_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_methods` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `method` VARCHAR(200) NOT NULL,
    `description` VARCHAR(500) NULL,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `created_by` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` BIGINT UNSIGNED NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `method`(`method`),
    INDEX `FK_payment_methods_users`(`created_by`),
    INDEX `FK_payment_methods_users_2`(`updated_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(250) NOT NULL,
    `description` LONGTEXT NULL,
    `quantity` DECIMAL(10, 2) NOT NULL,
    `quantity_unit` SMALLINT UNSIGNED NOT NULL,
    `price` DECIMAL(6, 2) NOT NULL,
    `discount` INTEGER UNSIGNED NULL,
    `discount_type` TINYINT UNSIGNED NULL,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `created_by` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` BIGINT UNSIGNED NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `FK_products_quantity_units`(`quantity_unit`),
    INDEX `FK_products_users`(`created_by`),
    INDEX `FK_products_users_2`(`updated_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quantity_units` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `unit` VARCHAR(100) NULL,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,

    UNIQUE INDEX `unit`(`unit`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refund_types` (
    `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(200) NOT NULL,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurant_cuisines` (
    `restaurant_id` INTEGER UNSIGNED NOT NULL,
    `cuisine_id` SMALLINT UNSIGNED NOT NULL,

    INDEX `FK_restaurant_cuisines_cuisines`(`cuisine_id`),
    PRIMARY KEY (`restaurant_id`, `cuisine_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurant_outlets` (
    `restaurant_id` INTEGER UNSIGNED NOT NULL,
    `outlet_id` SMALLINT UNSIGNED NOT NULL,

    INDEX `FK_restaurant_outlets_outlets`(`outlet_id`),
    PRIMARY KEY (`restaurant_id`, `outlet_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurant_products` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `restaurant_id` INTEGER UNSIGNED NOT NULL,
    `product_id` INTEGER UNSIGNED NOT NULL,
    `price` DECIMAL(6, 2) NULL,
    `discount` INTEGER UNSIGNED NULL,
    `discount_type` TINYINT UNSIGNED NULL,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `created_by` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` BIGINT UNSIGNED NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `FK_restaurant_products_products`(`product_id`),
    INDEX `FK_restaurant_products_restaurants`(`restaurant_id`),
    INDEX `FK_restaurant_products_users`(`created_by`),
    INDEX `FK_restaurant_products_users_2`(`updated_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurant_tables` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(500) NULL,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurant_time_slot_hours` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `restaurant_time_slot_id` SMALLINT UNSIGNED NOT NULL,
    `start_time` TIME(0) NOT NULL,
    `end_time` TIME(0) NOT NULL,

    INDEX `FK_restaurant_time_slot_hours_restaurant_time_slots`(`restaurant_time_slot_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurant_time_slots` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `restaurant_id` INTEGER UNSIGNED NOT NULL,
    `day_of_week` TINYINT UNSIGNED NOT NULL,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `created_by` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` BIGINT UNSIGNED NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `FK_restaurant_time_slots_restaurants`(`restaurant_id`),
    INDEX `FK_restaurant_time_slots_users`(`created_by`),
    INDEX `FK_restaurant_time_slots_users_2`(`updated_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurants` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(300) NOT NULL,
    `type` TINYINT UNSIGNED NOT NULL,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `owner_id` BIGINT UNSIGNED NOT NULL,
    `created_by` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` BIGINT UNSIGNED NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `FK_restaurants_order_types`(`type`),
    INDEX `FK_restaurants_user`(`owner_id`),
    INDEX `FK_restaurants_user_2`(`created_by`),
    INDEX `FK_restaurants_user_3`(`updated_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `employer_id` BIGINT UNSIGNED NULL,
    `role_id` TINYINT UNSIGNED NULL DEFAULT 1,
    `name` VARCHAR(255) NOT NULL,
    `phone_no` VARCHAR(15) NULL,
    `email` VARCHAR(255) NOT NULL,
    `email_verified_at` TIMESTAMP(0) NULL,
    `password` VARCHAR(255) NOT NULL,
    `remember_token` VARCHAR(100) NULL,
    `created_by` BIGINT UNSIGNED NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` BIGINT UNSIGNED NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    INDEX `FK_users_users`(`employer_id`),
    INDEX `FK_users_users_2`(`created_by`),
    INDEX `FK_users_users_3`(`updated_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `FK_addresses_users` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `FK_addresses_users_2` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `attachments` ADD CONSTRAINT `FK_attachments_users` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `attachments` ADD CONSTRAINT `FK_attachments_users_2` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `attachments` ADD CONSTRAINT `FK_attachments_users_3` FOREIGN KEY (`deleted_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cuisines` ADD CONSTRAINT `FK_cuisines_users` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cuisines` ADD CONSTRAINT `FK_cuisines_users_2` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_line_items` ADD CONSTRAINT `FK_order_line_items_orders` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_line_items` ADD CONSTRAINT `FK_order_line_items_restaurant_tables` FOREIGN KEY (`table_id`) REFERENCES `restaurant_tables`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_line_items` ADD CONSTRAINT `FK_order_line_items_users` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_line_items` ADD CONSTRAINT `FK_order_line_items_users_1` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_payment_methods` ADD CONSTRAINT `FK_order_payment_methods_orders` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_payment_methods` ADD CONSTRAINT `FK_order_payment_methods_payment_methods` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_payment_methods` ADD CONSTRAINT `FK_order_payment_methods_users` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_payment_methods` ADD CONSTRAINT `FK_order_payment_methods_users_2` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_refunds` ADD CONSTRAINT `FK_order_refunds_order_line_items` FOREIGN KEY (`order_line_item_id`) REFERENCES `order_line_items`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_refunds` ADD CONSTRAINT `FK_order_refunds_refund_types` FOREIGN KEY (`type`) REFERENCES `refund_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_refunds` ADD CONSTRAINT `FK_order_refunds_users` FOREIGN KEY (`refunded_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_refunds` ADD CONSTRAINT `FK_order_refunds_users_2` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_refunds` ADD CONSTRAINT `FK_order_refunds_users_3` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `FK_orders_order_types` FOREIGN KEY (`type`) REFERENCES `order_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `FK_orders_users` FOREIGN KEY (`ordered_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `FK_orders_users_2` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `FK_orders_users_3` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `outlets` ADD CONSTRAINT `FK_outlets_users` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `outlets` ADD CONSTRAINT `FK_outlets_users_2` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `payment_methods` ADD CONSTRAINT `FK_payment_methods_users` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `payment_methods` ADD CONSTRAINT `FK_payment_methods_users_2` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `FK_products_quantity_units` FOREIGN KEY (`quantity_unit`) REFERENCES `quantity_units`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `FK_products_users` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `FK_products_users_2` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_cuisines` ADD CONSTRAINT `FK_restaurant_cuisines_cuisines` FOREIGN KEY (`cuisine_id`) REFERENCES `cuisines`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_cuisines` ADD CONSTRAINT `FK_restaurant_cuisines_restaurants` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_outlets` ADD CONSTRAINT `FK_restaurant_outlets_outlets` FOREIGN KEY (`outlet_id`) REFERENCES `outlets`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_outlets` ADD CONSTRAINT `FK_restaurant_outlets_restaurants` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_products` ADD CONSTRAINT `FK_restaurant_products_products` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_products` ADD CONSTRAINT `FK_restaurant_products_restaurants` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_products` ADD CONSTRAINT `FK_restaurant_products_users` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_products` ADD CONSTRAINT `FK_restaurant_products_users_2` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_time_slot_hours` ADD CONSTRAINT `FK_restaurant_time_slot_hours_restaurant_time_slots` FOREIGN KEY (`restaurant_time_slot_id`) REFERENCES `restaurant_time_slots`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_time_slots` ADD CONSTRAINT `FK_restaurant_time_slots_restaurants` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_time_slots` ADD CONSTRAINT `FK_restaurant_time_slots_users` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_time_slots` ADD CONSTRAINT `FK_restaurant_time_slots_users_2` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurants` ADD CONSTRAINT `FK_restaurants_order_types` FOREIGN KEY (`type`) REFERENCES `order_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurants` ADD CONSTRAINT `FK_restaurants_user` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurants` ADD CONSTRAINT `FK_restaurants_user_2` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurants` ADD CONSTRAINT `FK_restaurants_user_3` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `FK_users_users` FOREIGN KEY (`employer_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `FK_users_users_2` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `FK_users_users_3` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
