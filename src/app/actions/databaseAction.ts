"use server";
import { db } from "@/lib/db";
import { uploadTable } from "@/lib/db/schema";
import { success, z } from "zod";

const uploadFileValidation = z.object({
  name: z.string(),
  fileId: z.string(),
  fileUrl: z.url(),
  thumbnailUrl: z.url(),
});

export async function UploadToDatabaseAction(formData: FormData) {
  const name = formData.get("name");
  const fileId = formData.get("fileId");
  const fileUrl = formData.get("fileUrl");
  const thumbnailUrl = formData.get("thumbnailUrl");
  const parsed = uploadFileValidation.safeParse({
    name,
    fileId,
    fileUrl,
    thumbnailUrl,
  });

  if (!parsed.success) {
    console.log(parsed.error);

    return {
      success: false,
      error: parsed.error.message,
    };
  }

  const validatedData = parsed.data;

  try {
    const [uploadData] = await db
      .insert(uploadTable)
      .values({
        fileId: validatedData.fileId,
        fileURL: validatedData.fileUrl,
        createdAt: new Date(),
        name: validatedData.name,
        thumbnailURL: validatedData.fileUrl,
      })
      .returning();

    return {
      success: true,
      message: "file added to database successfully to database",
      data: uploadData,
    };
  } catch (error) {
    return {
      success: false,
      error: "Error occured while add image to database",
    };
  }
}
