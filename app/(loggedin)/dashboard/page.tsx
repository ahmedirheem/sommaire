import React from "react";
import NoSummaries from "@/components/summaries/no-summaries";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { BgGradient } from "@/components/common";
import SummaryCard from "@/components/summaries/summary-card";
import { getSummariesAction } from "@/actions/summary-actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const DashboardHeader = () => {
  const uploadLimit = 5;

  return (
    <div className="w-full mb-4">
      <div className="flex flex-col items-center sm:items-start sm:flex-row justify-between gap-4 w-full  mb-4">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-900 text-transparent bg-clip-text mb-1">
            Your Summaries
          </h1>
          <p className="text-gray-500">
            Transform your PDFs into concise, actionable insights.
          </p>
        </div>
        <div>
          <Link href="/upload">
            <Button className="bg-linear-to-r from-rose-500 to-rose-700 text-white hover:from-rose-800 hover:to-rose-500">
              <Plus className="w-4 h-4" />
              New Summary
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-rose-50 rounded-lg p-4 border border-rose-200 text-rose-800">
        <p className="text-sm">
          You've reached the limit of {uploadLimit} uploads on the
          free plan.
          {"  "}
          <Link
            href="/#pricing"
            className="text-rose-800 underline font-medium underline-offset-4 inline-flex items-center"
          >
            Click here to upgrade to Pro
            <ArrowRight className="w-4 h-4 inline-block" />
          </Link>{" "}
          for unlimited uploads.
        </p>
      </div>
    </div>
  );
};

const page = async () => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    redirect("/sign-in");
  }

  const summaries = await getSummariesAction(userId);

  return (
    <div className="min-h-screen  py-12 lg:py-18">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <div className="container mx-auto flex flex-col gap-4">
        <DashboardHeader />
        {summaries?.length === 0 ? (
          <NoSummaries />
        ) : (
          <div className="w-full mx-auto grid grid-cols-1 gap-4 sm:gap-4 lg:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
            {summaries?.map((summary, indx) => (
              <SummaryCard key={indx} summary={summary} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
