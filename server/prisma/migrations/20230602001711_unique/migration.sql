/*
  Warnings:

  - A unique constraint covering the columns `[attribute_name]` on the table `InstituteAttributes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[attribute_name]` on the table `UsersAttributes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `first_person_text` to the `InstituteAttributes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `second_person_text` to the `InstituteAttributes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_person_text` to the `UsersAttributes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `second_person_text` to the `UsersAttributes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `InstituteAttributes` ADD COLUMN `first_person_text` VARCHAR(191) NOT NULL,
    ADD COLUMN `second_person_text` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `UsersAttributes` ADD COLUMN `first_person_text` VARCHAR(191) NOT NULL,
    ADD COLUMN `second_person_text` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `InstituteAttributes_attribute_name_key` ON `InstituteAttributes`(`attribute_name`);

-- CreateIndex
CREATE UNIQUE INDEX `UsersAttributes_attribute_name_key` ON `UsersAttributes`(`attribute_name`);
