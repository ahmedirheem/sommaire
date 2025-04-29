import React from "react";
import NavLink from "./nav-link";
import { FileText } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <nav className="container flex justify-between items-center py-4 lg:py-8 px-2 mx-auto">
      <div className="flex lg:flex-1">
        <NavLink
          href="/"
          className="flex gap-1 items-center lg:gap-2 group"
        >
          <FileText className="w-6 h-6 lg:w-8 lg:h-8 group-hover:rotate-12 transform transition duration-200" />
          <span className="font-extrabold text-lg lg:text-xl">Sommaire</span>
        </NavLink>
      </div>

      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href="/#pricing">Pricing</NavLink>
        <SignedIn>
          <NavLink href="/dashboard">Your Summaries</NavLink>
        </SignedIn>
      </div>

      <div className="flex lg:justify-end lg:flex-1">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <NavLink href="/upload" className="text-sm">Upload PDF</NavLink>
            <div>Pro</div>
            <UserButton />
          </div>
        </SignedIn>

        <SignedOut>
          <div>
            <NavLink href="/sign-in">Sign in</NavLink>
          </div>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Header;
