/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `user_address` MODIFY `address_line1` VARCHAR(191) NULL,
    MODIFY `address_line2` VARCHAR(191) NULL,
    MODIFY `city` VARCHAR(191) NULL,
    MODIFY `postal_code` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `is_admin` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `full_name` VARCHAR(191) NULL,
    MODIFY `mobile_phone` VARCHAR(12) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_username_key` ON `users`(`username`);
