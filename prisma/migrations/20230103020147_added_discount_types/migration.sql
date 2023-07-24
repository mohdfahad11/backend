-- CreateTable
CREATE TABLE `discount_types` (
    `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `type`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `FK_products_discount_types` ON `products`(`discount_type`);

-- CreateIndex
CREATE INDEX `FK_restaurant_products_discount_types` ON `restaurant_products`(`discount_type`);

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `FK_products_discount_types` FOREIGN KEY (`discount_type`) REFERENCES `discount_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_products` ADD CONSTRAINT `FK_restaurant_products_discount_types` FOREIGN KEY (`discount_type`) REFERENCES `discount_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
