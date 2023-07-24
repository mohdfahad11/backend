-- CreateTable
CREATE TABLE `modifier_categories` (
    `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `modifier_category` VARCHAR(200) NOT NULL,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,

    UNIQUE INDEX `modifier_category`(`modifier_category`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `modifiers` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `modifier_category_id` TINYINT UNSIGNED NULL,
    `modifier` VARCHAR(200) NOT NULL,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `created_by` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` BIGINT UNSIGNED NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `FK_modifiers_users`(`created_by`),
    INDEX `FK_modifiers_users_2`(`updated_by`),
    UNIQUE INDEX `modifier_category_id_modifier`(`modifier_category_id`, `modifier`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_modifier` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER UNSIGNED NOT NULL,
    `modifier_id` INTEGER UNSIGNED NOT NULL,
    `price` DECIMAL(6, 2) NOT NULL,
    `status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `created_by` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` BIGINT UNSIGNED NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `FK_product_modifier_users`(`created_by`),
    INDEX `FK_product_modifier_users_2`(`updated_by`),
    INDEX `FK_product_modifiers_modifiers`(`modifier_id`),
    UNIQUE INDEX `product_id_modifier_id`(`product_id`, `modifier_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `modifiers` ADD CONSTRAINT `FK_modifiers_modifier_categories` FOREIGN KEY (`modifier_category_id`) REFERENCES `modifier_categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `modifiers` ADD CONSTRAINT `FK_modifiers_users` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `modifiers` ADD CONSTRAINT `FK_modifiers_users_2` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_modifier` ADD CONSTRAINT `FK_product_modifier_users` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_modifier` ADD CONSTRAINT `FK_product_modifier_users_2` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_modifier` ADD CONSTRAINT `FK_product_modifiers_modifiers` FOREIGN KEY (`modifier_id`) REFERENCES `modifiers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_modifier` ADD CONSTRAINT `FK_product_modifiers_products` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
