/*
  Warnings:

  - You are about to drop the column `user_address` on the `Intitutes` table. All the data in the column will be lost.
  - You are about to drop the column `user_attributes` on the `Intitutes` table. All the data in the column will be lost.
  - You are about to drop the column `user_birth` on the `Intitutes` table. All the data in the column will be lost.
  - Added the required column `institute_attributes` to the `Intitutes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institute_desc` to the `Intitutes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Intitutes` DROP COLUMN `user_address`,
    DROP COLUMN `user_attributes`,
    DROP COLUMN `user_birth`,
    ADD COLUMN `institute_attributes` LONGTEXT NOT NULL,
    ADD COLUMN `institute_desc` LONGTEXT NOT NULL,
    MODIFY `institute_doc` VARCHAR(18) NOT NULL;

-- CreateTable
CREATE TABLE `InstituteAttributes` (
    `attribute_id` INTEGER NOT NULL AUTO_INCREMENT,
    `attribute_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`attribute_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsersAttributes` (
    `attribute_id` INTEGER NOT NULL AUTO_INCREMENT,
    `attribute_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`attribute_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
