/*
  Warnings:

  - Added the required column `institute_city` to the `Intitutes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institute_uf` to the `Intitutes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_city` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_uf` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Intitutes` ADD COLUMN `institute_city` VARCHAR(255) NOT NULL,
    ADD COLUMN `institute_uf` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Users` ADD COLUMN `user_city` VARCHAR(255) NOT NULL,
    ADD COLUMN `user_uf` VARCHAR(255) NOT NULL;
