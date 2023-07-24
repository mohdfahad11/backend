-- AlterTable
ALTER TABLE `orders` ADD COLUMN `discount_reason` VARCHAR(500) NULL,
    ADD COLUMN `surcharge_type` TINYINT UNSIGNED NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `email` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `surcharge_types` (
    `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
