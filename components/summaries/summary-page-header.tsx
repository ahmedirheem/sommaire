import React from "react";
import { Badge } from "../ui/badge";
import { Calendar, ChevronLeft, Clock, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import SummaryPageHeaderActions from "./summary-page-header-actions";

type SummaryHeaderProps = {
  date: string;
  time: number;
  title: string;
  fileName: string;
  originalFileUrl: string;
  summary: string;
  createdAt: string;
};

const SummaryPageHeader = ({
  date,
  time,
  title,
  fileName,
  originalFileUrl,
  summary,
  createdAt,
}: SummaryHeaderProps) => {
  return (
    <div>
      <div className="flex items-center justify-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Badge
            variant={"secondary"}
            className="relative px-6 py-2 rounded-full font-medium bg-white group-hover:bg-gray-50 transition-colors duration-200"
          >
            <Sparkles className="h-8 w-8 text-rose-600" />
            <p className="text-sm text-rose-600">AI Summary</p>
          </Badge>

          <Badge
            variant={"outline"}
            className="relative px-4 py-1 rounded-full font-medium  group-hover:bg-gray-50 transition-colors duration-200"
          >
            <Calendar className="h-6 w-6 text-rose-600" />
            <p className="text-sm text-gray-600">{date}</p>
          </Badge>

          <Badge
            variant={"outline"}
            className="relative px-4 py-1 rounded-full font-medium  group-hover:bg-gray-50 transition-colors duration-200"
          >
            <Clock className="h-6 w-6 text-rose-600" />
            <p className="text-sm text-gray-600">{time} min</p>
          </Badge>
        </div>
        <div className="hidden sm:block">
          <Link href="/dashboard">
            <Button
              variant="link"
              className="bg-rose-200 rounded-full py-3 px-4 text-gray-700"
            >
              <ChevronLeft className="h-8 w-8 text-rose-600 " />
              <p className="text-base">Back to Dashboard</p>
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <h1 className="text-3xl lg:text-4xl font-bold lg:tracking-tight py-4">
          <span className="bg-linear-to-r from-rose-600 to bg-orange-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
      </div>

      <SummaryPageHeaderActions
        fileName={fileName}
        originalFileUrl={originalFileUrl}
        title={title}
        createdAt={createdAt}
        summary={summary}
      />
    </div>
  );
};

export default SummaryPageHeader;
