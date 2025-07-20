/*
  Warnings:

  - You are about to drop the column `providerUserId` on the `connections` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider,provider_account_id]` on the table `connections` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider_account_id` to the `connections` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "connections_provider_providerUserId_key";

-- AlterTable
ALTER TABLE "connections" DROP COLUMN "providerUserId",
ADD COLUMN     "provider_account_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "connections_provider_provider_account_id_key" ON "connections"("provider", "provider_account_id");
