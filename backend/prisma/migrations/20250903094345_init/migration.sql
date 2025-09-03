/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Reservation_date_key` ON `Reservation`(`date`);
