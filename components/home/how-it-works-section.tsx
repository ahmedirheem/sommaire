import {
  ArrowRight,
  BrainCircuit,
  FileOutput,
  FileText,
  MoveRight,
} from "lucide-react";
import React from "react";

type Step = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: (
      <FileText size={64} strokeWidth={1.5} />
    ),
    title: "Upload your PDF",
    description:
      "Upload your PDF file to the platform. We support all major file formats.",
  },
  {
    icon: (
      <BrainCircuit size={64} strokeWidth={1.5} />
    ),
    title: "AI Analysis",
    description:
      "Our AI will analyze the text and extract the key points.",
  },
  {
    icon: (
      <FileOutput size={64} strokeWidth={1.5} />
    ),
    title: "Get Summary",
    description:
      "The AI will generate a summary of the text.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 sm:left-[calc(50%+36rem] sm:w-[72.1875rem]"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 text-center mb-12 sm:mb-16 lg:mb-24">
          <h2 className="text-rose-500 font-bold uppercase text-xl ">
            How it works
          </h2>
          <h3 className="text-3xl font-bold max-w-2xl">
            Transform any PDF into an
            easy-to-digest summary in three simple
            steps
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex items-stretch">
              <StepItem {...step} />

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-8 transform -translate-y-1/2 z-10">
                  <MoveRight
                    size={32}
                    strokeWidth={1}
                    className="text-rose-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StepItem = ({
  icon,
  title,
  description,
}: Step) => {
  return (
    <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-rose-500/5 transition-colors group w-full">
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-linear-to-br from-rose-500/10 to-transparent group-hover:from-rose-500/20 transition-colors">
          <div className="text-rose-500">
            {icon}
          </div>
        </div>
        <div>
          <h3 className="text-center font-bold text-lg mb-4">
            {title}
          </h3>
          <p className="text-center text-gray-600 text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
