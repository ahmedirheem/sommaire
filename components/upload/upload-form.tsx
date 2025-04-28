"use client";

import React, { useRef, useState } from "react";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { useRouter } from "next/navigation";

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
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

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
    try {
      setIsLoading(true);
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
        setIsLoading(false);
        return;
      }

      toast("Uploading you PDF...", {
        icon: "🔄",
        description: "This may take a few seconds...",
      });

      // Upload the file to the server
      const resp = await startUpload([file]);
      if (!resp) {
        toast("Something went wrong", {
          description: "Please try a different file",
          icon: "🚨",
        });
        setIsLoading(false);
        return;
      }

      toast("Processing your PDF...", {
        icon: "📃",
        description:
          "Hang tight! Our AI is reading through your document",
      });

      // Parse the PDF using Langchain
      // Summarize the PDF using AI
      const result = await generatePdfSummary(resp);
      // const summary = await generatePdfSummary([{
      //   serverData: {
      //     userId: resp[0].serverData.userId,
      //     file: {
      //       ufsUrl: resp[0].serverData.file.ufsUrl,
      //       name: resp[0].serverData.file.name
      //     }
      //   }
      // }]);
      const { data = null, message = null } = result || {};

      if (data) {
        let storedSummary;
        toast("Saving PDF...", {
          icon: "📃",
          description: "Hang tight! Ae are saving your summary",
        });

        if (data.summary) {
          //   save the summary to the database
          storedSummary = await storePdfSummaryAction({
            summary: data.summary,
            fileUrl: resp[0].serverData.file.ufsUrl,
            title: data.title,
            fileName: file.name,
          });

          toast("Summary Generated", {
            icon: "✅",
            description:
              "Your PDF has been successfully summarized and saved",
          });

          formRef.current?.reset();
          // Redirect to the [id] summary page
          console.log("Stored Summary  from test", storedSummary);
          console.log("Stored Summary IDDDD from test", storedSummary.data?.id);
          
          router.push(`/summary/${storedSummary.data?.id}`)
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log("An Error Occured", error);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto">
      <UploadFormInput
        ref={formRef}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UploadForm;
