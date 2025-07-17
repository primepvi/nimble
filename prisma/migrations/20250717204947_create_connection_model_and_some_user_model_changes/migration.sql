/*
  Warnings:

  - You are about to drop the column `refresh_token` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ConnectionProvider" AS ENUM ('Github', 'Discord');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "refresh_token";

-- CreateTable
CREATE TABLE "connections" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "provider" "ConnectionProvider" NOT NULL,
    "providerUserId" TEXT NOT NULL,
    "scope" TEXT,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT,
    "expires_at" TIMESTAMP(3),

    CONSTRAINT "connections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "connections_provider_providerUserId_key" ON "connections"("provider", "providerUserId");

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
