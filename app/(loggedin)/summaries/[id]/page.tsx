import { getSummaryById } from "@/actions/summary-actions";
import { BgGradient } from "@/components/common";
import SummaryPageBody from "@/components/summaries/summary-page-body";
import SummaryPageHeader from "@/components/summaries/summary-page-header";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const summary = await getSummaryById(id);
  if (!summary) {
    notFound();
  }

  const date = new Date(summary.created_at);
  const formatted = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const wordCount = summary.summary.trim().split(/\s+/).length;
  const time = Math.round(wordCount / 200);  

  return (
    <div className="min-h-screen py-4 lg:py-8">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <div className="container mx-auto flex flex-col gap-8">
        <SummaryPageHeader date={formatted} time={time} title={summary.title} fileName={summary.file_name} originalFileUrl={summary.original_file_url} summary={summary.summary} createdAt={summary.created_at}/>

        <SummaryPageBody summary={summary.summary} wordCount={wordCount} />
      </div>
    </div>
  );
};

export default page;
