-- CreateTable
CREATE TABLE `order_modifiers` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `restaurant_product_modifier_id` BIGINT UNSIGNED NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `order_line_item_id` BIGINT UNSIGNED NOT NULL,

    INDEX `FK_order_modifiers_order_line_items`(`order_line_item_id`),
    INDEX `FK_order_modifiers_restaurant_product_modifiers`(`restaurant_product_modifier_id`),
    UNIQUE INDEX `restaurant_product_modifier_id_order_line_item_id`(`restaurant_product_modifier_id`, `order_line_item_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order_modifiers` ADD CONSTRAINT `FK_order_modifiers_order_line_items` FOREIGN KEY (`order_line_item_id`) REFERENCES `order_line_items`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_modifiers` ADD CONSTRAINT `FK_order_modifiers_restaurant_product_modifiers` FOREIGN KEY (`restaurant_product_modifier_id`) REFERENCES `restaurant_product_modifiers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
