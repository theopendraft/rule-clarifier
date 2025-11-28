import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "16MB" } })
    .middleware(async ({ req }) => {
      console.log("UploadThing middleware called");
      return { userId: "admin" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("UploadThing upload complete:", {
        userId: metadata.userId,
        fileName: file.name,
        fileUrl: file.url,
        fileSize: file.size
      });
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

// Minimal utapi shim for environments where UploadThing server API client
// is not available (keeps build workable on Vercel during initial deploy).
// In production you should replace this with the real UploadThing server client
// and ensure `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID` are set in Vercel env.
export const utapi = {
  async uploadFiles(files: any[]) {
    // Local/dev fallback: return a simulated upload response mapping files to a url
    return files.map((file: any, idx: number) => ({
      data: {
        url: `/manual/mock-upload-${Date.now()}-${idx}.pdf`
      }
    }));
  }
};
