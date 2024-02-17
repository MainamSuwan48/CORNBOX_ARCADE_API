/*
  Warnings:

  - You are about to drop the column `attribute` on the `product_category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order_item` ADD COLUMN `attribute` TEXT NULL;

-- AlterTable
ALTER TABLE `product_category` DROP COLUMN `attribute`;

-- AlterTable
ALTER TABLE `shopping_cart_item` ADD COLUMN `attribute` TEXT NULL;
