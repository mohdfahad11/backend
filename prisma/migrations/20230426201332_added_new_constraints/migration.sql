/*
  Warnings:

  - You are about to alter the column `status` on the `cashups` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `UnsignedTinyInt`.
  - You are about to drop the column `delivery_time_hrs` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `waiting_time_hrs` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cashups` MODIFY `status` TINYINT UNSIGNED NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `delivery_time_hrs`,
    DROP COLUMN `waiting_time_hrs`,
    ADD COLUMN `delivery_time` TIME(0) NULL,
    ADD COLUMN `waiting_time` TIME(0) NULL;
