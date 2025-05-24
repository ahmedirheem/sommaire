import React from "react";
import { FileText } from "lucide-react";
import SummaryViewer from "./summary-viewer";

const SummaryPageBody = ({
  summary,
  wordCount,
}: {
  summary: string;
  wordCount: number;
}) => {
  return (
    <div className="border shadow-lg rounded-xl p-4 w-full max-w-2xl flex flex-col items-center justify-center mx-auto">
      <div className="flex items-center gap-2 mb-2 ml-auto">
        <FileText className="h-5 w-5 text-rose-600" />
        <p className="text-base text-gray-700 font-medium ">
          <span className="mr-1 text-black font-bold">{wordCount}</span>
          word
        </p>
      </div>
      <SummaryViewer summary={summary} />
    </div>
  );
};

export default SummaryPageBody;
