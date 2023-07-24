-- CreateIndex
CREATE INDEX `FK_orders_surcharge_types` ON `orders`(`surcharge_type`);

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `FK_orders_surcharge_types` FOREIGN KEY (`surcharge_type`) REFERENCES `surcharge_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
