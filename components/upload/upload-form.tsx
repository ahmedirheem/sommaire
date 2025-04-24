"use client";

import React from "react";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";

const schema = z.object({
  file: z
    // .instanceof(File, { message: "Please upload a valid PDF file" })
    .custom<File>(
      (val) => {
        return (
          typeof val === "object" &&
          val !== null &&
          "size" in val &&
          "type" in val
        );
      },
      {
        message: "Please upload a valid PDF file",
      }
    )
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});

const UploadForm = () => {
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (error: Error) => {
      toast("Error occurred while uploading", {
        description: error.message,
        icon: "🚨",
      });
    },
    onUploadBegin: (file) => {
      console.log("upload has begun for", file);
    },
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log("submitted");

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    const validatedFields = schema.safeParse({ file });

    if (!validatedFields.success) {
      toast("Something went wrong", {
        description:
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
          "Invalid File",
        icon: "🚨",
      });
      return;
    }

    toast("Uploading you PDF...", {
      icon: "🔄",
      description: "This may take a few seconds...",
    });

    const resp = await startUpload([file]);
    if (!resp) {
      toast("Something went wrong", {
        description: "Please try a different file",
        icon: "🚨",
      });
      return;
    }

    toast("Processing your PDF...", {
      icon: "📃",
      description:
        "Hang tight! Our AI is reading through your document",
    });
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
};

export default UploadForm;
