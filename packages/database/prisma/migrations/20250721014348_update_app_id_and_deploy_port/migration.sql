/*
  Warnings:

  - The primary key for the `applications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `applications` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `application_id` on the `deploys` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `port` on table `deploys` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "deploys" DROP CONSTRAINT "deploys_application_id_fkey";

-- AlterTable
ALTER TABLE "applications" DROP CONSTRAINT "applications_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "applications_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "deploys" DROP COLUMN "application_id",
ADD COLUMN     "application_id" INTEGER NOT NULL,
ALTER COLUMN "port" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "deploys" ADD CONSTRAINT "deploys_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
