-- AlterTable
ALTER TABLE "public"."notifications" ADD COLUMN     "changelogId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_changelogId_fkey" FOREIGN KEY ("changelogId") REFERENCES "public"."change_logs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
