/*
  Warnings:

  - Added the required column `user_typeblood` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Users` ADD COLUMN `user_typeblood` VARCHAR(2) NOT NULL;
