import React from "react";
import { Button } from "../ui/button";
import {
  ArrowRight,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Plan = {
  id: string;
  name: "Free" | "Basic" | "Pro";
  price: number;
  description: string;
  features: string[];
  paymentLink: string;
  priceId: string;
};

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Perfect for personal use",
    features: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    paymentLink: "",
    priceId: "",
  },
  {
    id: "basic",
    name: "Basic",
    price: 9,
    description: "Perfect for occasional use",
    features: [
      "20 PDF summaries per month",
      "Faster processing speed",
      "Priority email support",
      "Access to full summary library",
    ],
    paymentLink: "",
    priceId: "",
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    description:
      "Perfect for professionals and teams",
    features: [
      "Unlimited PDF summaries",
      "Fastest processing speed",
      "Access to full summary library",
      "Team collaboration features",
      "Early access to new features",
    ],
    paymentLink: "",
    priceId: "",
  },
];

const Pricing = () => {
  return (
    <section className="relative" id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center mb-12 sm:mb-16 lg:mb-24">
          <h2 className="text-rose-500 font-bold uppercase text-xl ">
            Pricing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8">
          {plans.map((plan, idx) => (
            <PricingCard key={idx} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({
  id,
  name,
  price,
  description,
  features,
  paymentLink,
  priceId,
}: Plan) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between h-[24rem] md:h-[26rem] lg:h-[24rem] bg-white/5 border border-white/10 rounded-lg shadow transform hover:scale-105 transition duration-200 p-4",
        id === "basic" &&
          "border-2 border-rose-200",
        id === "pro" && "border-2 border-rose-500"
      )}
    >
      <div className="mb-5">
        <h3 className="text-2xl font-bold">
          {name}
        </h3>
        <p className="text-gray-700">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <p className="text-4xl tracking-tighter font-extrabold">
          ${price}
        </p>
        <div>
          <p className="text-xs">USD</p>
          <p className="text-xs">/month</p>
        </div>
      </div>

      <ul className="mb-5">
        {features.map((feature, idx) => (
          <li
            key={idx}
            className="text-sm flex items-center gap-2 mb-1"
          >
            <Check size={14} strokeWidth={3} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="justify-end">
        <Button
          className={cn(
            "text-base w-full bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 transform transition duration-200 rounded-full",
            id === "free" &&
              "from-rose-500 to-rose-300 hover:from-rose-300 hover:to-rose-500",
            id === "basic" &&
              "from-rose-700 to-rose-500 hover:from-rose-500 hover:to-rose-700",
            id === "pro" &&
              "from-rose-900 to-rose-600 hover:from-rose-600 hover:to-rose-900"
          )}
        >
          <Link href={paymentLink} className="w-full flex items-center gap-4 justify-center">
            {id === "free"
              ? "Get Started"
              : "By Now"}
            <ArrowRight className="w-4 h-4 animate-pulse" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Pricing;
