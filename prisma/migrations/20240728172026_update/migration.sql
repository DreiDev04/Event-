-- DropForeignKey
ALTER TABLE "GroupEvent" DROP CONSTRAINT "GroupEvent_groupId_fkey";

-- AlterTable
ALTER TABLE "GroupEvent" ALTER COLUMN "groupId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "GroupEvent" ADD CONSTRAINT "GroupEvent_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
