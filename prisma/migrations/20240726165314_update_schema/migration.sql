/*
  Warnings:

  - Added the required column `description` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "description" TEXT NOT NULL;
