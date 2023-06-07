/*
  Warnings:

  - Added the required column `institute_address` to the `Intitutes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Intitutes` ADD COLUMN `institute_address` VARCHAR(255) NOT NULL,
    ADD COLUMN `institute_role` ENUM('ADMIN', 'USER', 'INSTITUTE') NOT NULL DEFAULT 'INSTITUTE';
