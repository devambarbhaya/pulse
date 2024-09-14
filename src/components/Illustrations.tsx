"use client";

import { cn, PropsWithClassName } from "@/lib/utils/ui-utils";
import Image from "next/image";

type IllustrationProps = PropsWithClassName<{
  width?: number;
  height?: number;
  children: React.ReactNode;
}>;

export function NotFound({
  children,
  width = 180,
  height = 180,
  className,
}: IllustrationProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className
      )}
    >
      <Image src="/empty.svg" alt="Empty" height={height} width={width} />
      {children}
    </div>
  );
}

export function NoContent({
  children,
  width = 180,
  height = 180,
  className,
}: IllustrationProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className
      )}
    >
      <Image src="/create.svg" alt="Empty" height={height} width={width} />
      {children}
    </div>
  );
}
