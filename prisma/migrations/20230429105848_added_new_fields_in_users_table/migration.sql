/*
  Warnings:

  - You are about to alter the column `status` on the `cashups` table. The data in that column could be lost. The data in that column will be cast from `UnsignedTinyInt` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `cashups` MODIFY `status` TINYINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `dob` DATE NULL,
    ADD COLUMN `gender` ENUM('Male', 'Female') NULL,
    ADD COLUMN `note` VARCHAR(500) NULL,
    ADD COLUMN `postcode` VARCHAR(20) NULL;
