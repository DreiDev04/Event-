/*
  Warnings:

  - You are about to drop the `GroupEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GroupEvent" DROP CONSTRAINT "GroupEvent_groupId_fkey";

-- DropTable
DROP TABLE "GroupEvent";
