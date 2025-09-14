import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing({
  errorFormatter: (err) => {
    console.error("UploadThing error:", err);
    return {
      message: err.message,
      code: err.code,
    };
  },
});

export const ourFileRouter = {
  pdfUploader: f({ 
    "application/pdf": { 
      maxFileSize: "16MB", 
      maxFileCount: 1,
      minFileCount: 1
    }
  })
    .middleware(async ({ req }) => {
      console.log("PDF upload middleware called");
      // In a real app, you'd get the user ID from authentication
      return { userId: "admin" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("PDF upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      console.log("file name", file.name);
      console.log("file size", file.size);
      
      // Here you could save the file info to your database
      // await prisma.uploadedFile.create({
      //   data: {
      //     name: file.name,
      //     url: file.url,
      //     size: file.size,
      //     userId: metadata.userId,
      //   }
      // });
      
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
