/*
  Warnings:

  - The `discount` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `discount`,
    ADD COLUMN `discount` DECIMAL(10, 6) NULL;
