/*
  Warnings:

  - You are about to drop the column `name` on the `Application` table. All the data in the column will be lost.
  - Added the required column `port` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repository` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "name",
ADD COLUMN     "container_id" TEXT,
ADD COLUMN     "port" INTEGER NOT NULL,
ADD COLUMN     "repository" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;
