/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `unit` on table `quantity_units` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `restaurant_id` to the `restaurant_tables` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `quantity_units` MODIFY `unit` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `restaurant_tables` ADD COLUMN `restaurant_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `username` VARCHAR(200) NULL;

-- CreateTable
CREATE TABLE `roles` (
    `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `FK_restaurant_tables_restaurants` ON `restaurant_tables`(`restaurant_id`);

-- CreateIndex
CREATE UNIQUE INDEX `username` ON `users`(`username`);

-- AddForeignKey
ALTER TABLE `restaurant_tables` ADD CONSTRAINT `FK_restaurant_tables_restaurants` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
