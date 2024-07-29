-- CreateTable
CREATE TABLE "GroupEvent" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isAllDay" BOOLEAN NOT NULL,
    "groupId" TEXT,

    CONSTRAINT "GroupEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroupEvent" ADD CONSTRAINT "GroupEvent_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
