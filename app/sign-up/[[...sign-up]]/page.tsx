import { BgGradient } from "@/components/common";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="flex items-start justify-center">
      <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <BgGradient className="from-rose-200 via-rose-300 to-orange-200" />
        <SignUp />
      </div>
    </section>
  );
}
