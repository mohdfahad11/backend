/*
  Warnings:

  - A unique constraint covering the columns `[restaurant_unique_id]` on the table `restaurants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `restaurant_unique_id` ON `restaurants`(`restaurant_unique_id`);

-- CreateIndex
CREATE UNIQUE INDEX `username` ON `users`(`username`);
