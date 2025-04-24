import { BgGradient } from "@/components/common";
import { UploadForm, UploadHeader } from "@/components/upload";
import React from "react";

const Page = () => {
  return (
    <section className="relative min-h-screen">
      <BgGradient />
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </div>
    </section>
  );
};

export default Page;
