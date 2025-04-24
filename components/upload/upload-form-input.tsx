"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const UploadFormInput = ({ onSubmit }: UploadFormInputProps) => {
  return (
    <div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex justify-end items-center gap-1.5">
          <Input
            type="file"
            name="file"
            id="file"
            accept="application/pdf"
            required
            className=""
          />
          <Button>Upload your PDF</Button>
        </div>
      </form>
    </div>
  );
};

export default UploadFormInput;
