-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `cardNumber` VARCHAR(191) NULL,
    `balance` DOUBLE NOT NULL DEFAULT 0.0,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_cardNumber_key`(`cardNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
