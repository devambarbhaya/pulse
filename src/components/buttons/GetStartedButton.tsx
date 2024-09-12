"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const btnClasses = cn(
  "p-6 text-sm rounded-sm lg:p-8 lg:text-xl",
  buttonVariants()
);

export function GetStartedButton() {
  // TODO: Add Authentication and dynamic routing

  return (
    <Link href={"#"} className={btnClasses}>
      Get Started 👉
    </Link>
  );
}
