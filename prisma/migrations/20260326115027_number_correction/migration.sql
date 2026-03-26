-- DropIndex
DROP INDEX `User_number_key` ON `user`;

-- AlterTable
ALTER TABLE `user` MODIFY `number` VARCHAR(191) NULL;
