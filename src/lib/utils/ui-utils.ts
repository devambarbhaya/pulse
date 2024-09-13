import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type PropsWithClassName<T = {}> = T & { className?: string };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
