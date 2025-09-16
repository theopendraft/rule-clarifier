/*
  Warnings:

  - The values [SUB_CHAPTER] on the enum `EntityType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `subChapterId` on the `rules` table. All the data in the column will be lost.
  - You are about to drop the `sub_chapters` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `chapterId` on table `rules` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."ContentType" ADD VALUE 'PARAGRAPH';
ALTER TYPE "public"."ContentType" ADD VALUE 'REFERENCE';

-- AlterEnum
BEGIN;
CREATE TYPE "public"."EntityType_new" AS ENUM ('RULE_BOOK', 'CHAPTER', 'RULE', 'CONTENT_BLOCK', 'RULE_LINK', 'MANUAL', 'CIRCULAR');
ALTER TABLE "public"."change_logs" ALTER COLUMN "entityType" TYPE "public"."EntityType_new" USING ("entityType"::text::"public"."EntityType_new");
ALTER TYPE "public"."EntityType" RENAME TO "EntityType_old";
ALTER TYPE "public"."EntityType_new" RENAME TO "EntityType";
DROP TYPE "public"."EntityType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."rules" DROP CONSTRAINT "rules_subChapterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."sub_chapters" DROP CONSTRAINT "sub_chapters_chapterId_fkey";

-- AlterTable
ALTER TABLE "public"."rules" DROP COLUMN "subChapterId",
ALTER COLUMN "chapterId" SET NOT NULL;

-- DropTable
DROP TABLE "public"."sub_chapters";

-- CreateTable
CREATE TABLE "public"."rule_images" (
    "id" TEXT NOT NULL,
    "ruleId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "caption" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rule_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."manuals" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "version" TEXT,
    "pdfUrl" TEXT,
    "pdfFileName" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "manuals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."circulars" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "number" TEXT,
    "date" TIMESTAMP(3),
    "pdfUrl" TEXT,
    "pdfFileName" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "circulars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rule_images_ruleId_imageId_key" ON "public"."rule_images"("ruleId", "imageId");

-- CreateIndex
CREATE UNIQUE INDEX "manuals_code_key" ON "public"."manuals"("code");

-- CreateIndex
CREATE UNIQUE INDEX "circulars_code_key" ON "public"."circulars"("code");

-- AddForeignKey
ALTER TABLE "public"."rule_images" ADD CONSTRAINT "rule_images_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "public"."rules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rule_images" ADD CONSTRAINT "rule_images_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "public"."images"("id") ON DELETE CASCADE ON UPDATE CASCADE;
