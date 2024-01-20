import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { SwitchCamera } from "lucide-react";

const Logo = () => {
  return (
    <Link
      href={"/dashboard"}
      className={buttonVariants({
        className:
          "hidden md:flex navLink !mb-10 lg:hover:bg-transparent lg:!p-0",
        variant: "ghost",
        size: "lg",
      })}
    >
      <SwitchCamera className="h-6 w-6 shrink-0 lg:hidden" />
      <p className={`font-semibold text-xl hidden lg:block`}>Pinstagram</p>
    </Link>
  );
};

export default Logo;
