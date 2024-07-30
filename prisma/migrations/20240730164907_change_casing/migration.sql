/*
  Warnings:

  - The primary key for the `GroupEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `endTime` on the `GroupEvent` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `GroupEvent` table. All the data in the column will be lost.
  - You are about to drop the column `isAllDay` on the `GroupEvent` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `GroupEvent` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `GroupEvent` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `GroupEvent` table. All the data in the column will be lost.
  - Added the required column `EndTime` to the `GroupEvent` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `GroupEvent` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `IsAllDay` to the `GroupEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `StartTime` to the `GroupEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Subject` to the `GroupEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupEvent" DROP CONSTRAINT "GroupEvent_pkey",
DROP COLUMN "endTime",
DROP COLUMN "id",
DROP COLUMN "isAllDay",
DROP COLUMN "location",
DROP COLUMN "startTime",
DROP COLUMN "subject",
ADD COLUMN     "EndTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "IsAllDay" BOOLEAN NOT NULL,
ADD COLUMN     "Location" TEXT,
ADD COLUMN     "StartTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "Subject" TEXT NOT NULL,
ADD CONSTRAINT "GroupEvent_pkey" PRIMARY KEY ("Id");
