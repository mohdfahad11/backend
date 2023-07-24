-- DropIndex
DROP INDEX `attachment_type_module_type_module_id` ON `attachments`;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `barcode` VARCHAR(50) NULL;
