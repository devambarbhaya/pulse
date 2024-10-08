"use client";

import { cn, PropsWithClassName } from "@/lib/utils/ui-utils";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import { baseUrl } from "@/config/routes";

export function PublicAuthButtons({ className }: PropsWithClassName) {
  const pathname = usePathname();

  return (
    <div className={cn("inline-flex items-center gap-x-3", className)}>
      <LoginLink
        postLoginRedirectURL={`${baseUrl}${pathname}`}
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "ring-1 ring-white"
        )}
      >
        Sign In
      </LoginLink>
      <RegisterLink
        postLoginRedirectURL={`${baseUrl}${pathname}`}
        className={cn(
          buttonVariants({ variant: "default" }),
          "ring-1 ring-white"
        )}
      >
        Sign Up
      </RegisterLink>
    </div>
  );
}
