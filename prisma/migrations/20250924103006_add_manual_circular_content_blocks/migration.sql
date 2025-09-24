-- AlterTable
ALTER TABLE "public"."content_blocks" ADD COLUMN     "circularId" TEXT,
ADD COLUMN     "manualId" TEXT,
ALTER COLUMN "ruleId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."content_blocks" ADD CONSTRAINT "content_blocks_manualId_fkey" FOREIGN KEY ("manualId") REFERENCES "public"."manuals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."content_blocks" ADD CONSTRAINT "content_blocks_circularId_fkey" FOREIGN KEY ("circularId") REFERENCES "public"."circulars"("id") ON DELETE CASCADE ON UPDATE CASCADE;
