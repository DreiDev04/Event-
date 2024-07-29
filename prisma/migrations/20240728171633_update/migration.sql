/*
  Warnings:

  - Made the column `groupId` on table `GroupEvent` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "GroupEvent" DROP CONSTRAINT "GroupEvent_groupId_fkey";

-- AlterTable
ALTER TABLE "GroupEvent" ALTER COLUMN "groupId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "GroupEvent" ADD CONSTRAINT "GroupEvent_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
