import { ExternalLink, FileText } from "lucide-react";
import Link from "next/link";
import React from "react";
import DownloadBtn from "./download-btn";

const SummaryPageHeaderActions = ({
  fileName,
  originalFileUrl,
  summary,
  title,
  createdAt,
}: {
  fileName: string;
  originalFileUrl: string;
  summary: string;
  title: string;
  createdAt: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-rose-600" />
        <p className="text-lg text-gray-700 font-medium">
          Source: {fileName}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href={originalFileUrl}
          target="_blank"
          className="flex items-center text-rose-600 gap-2 hover:underline"
        >
          <ExternalLink className="h-5! w-5!" />
          <p className="text-sm font-medium">View Orginal</p>
        </Link>

        <DownloadBtn
          title={title}
          summary={summary}
          fileName={fileName}
          createdAt={createdAt}
        />
      </div>
    </div>
  );
};

export default SummaryPageHeaderActions;
