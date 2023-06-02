-- CreateTable
CREATE TABLE `Users` (
    `user_id` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(255) NOT NULL,
    `user_cpf` VARCHAR(14) NOT NULL,
    `user_email` VARCHAR(255) NOT NULL,
    `user_password` VARCHAR(255) NOT NULL,
    `user_gender` ENUM('FEMALE', 'MALE', 'UNDEFINED') NOT NULL,
    `user_biogender` ENUM('FEMALE', 'MALE') NOT NULL,
    `user_address` VARCHAR(255) NOT NULL,
    `user_birth` DATE NOT NULL,
    `user_attributes` LONGTEXT NOT NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `edited_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Intitutes` (
    `institute_id` VARCHAR(191) NOT NULL,
    `institute_name` VARCHAR(255) NOT NULL,
    `institute_doc` INTEGER NOT NULL,
    `institute_email` VARCHAR(255) NOT NULL,
    `institute_password` VARCHAR(255) NOT NULL,
    `institute_segment` INTEGER NOT NULL,
    `user_address` VARCHAR(255) NOT NULL,
    `user_birth` DATE NOT NULL,
    `user_attributes` LONGTEXT NOT NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `edited_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`institute_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Institutes_Users` (
    `userId` VARCHAR(191) NOT NULL,
    `instituteId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `instituteId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Segments` (
    `segment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `segment_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`segment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Intitutes` ADD CONSTRAINT `Intitutes_institute_segment_fkey` FOREIGN KEY (`institute_segment`) REFERENCES `Segments`(`segment_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Institutes_Users` ADD CONSTRAINT `Institutes_Users_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Institutes_Users` ADD CONSTRAINT `Institutes_Users_instituteId_fkey` FOREIGN KEY (`instituteId`) REFERENCES `Intitutes`(`institute_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
