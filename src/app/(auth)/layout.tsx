import { Navbar } from "@/components/layout/Navbar";
import { PropsWithChildren } from "react";

export const dynamic = "force-dynamic";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main className="h-[calc(100vh-68px)]">{children}</main>
    </>
  );
}
