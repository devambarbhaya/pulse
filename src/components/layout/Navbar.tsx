import routes from "@/config/routes";
import Link from "next/link";
import { Logo } from "../Logo";
import { AuthButtons } from "../buttons/AuthButtons";
import { Suspense } from "react";
import { AuthLoader } from "../Loader";

export async function Navbar() {
  return (
    <header className="bg-blue-600 text-primary-foreground h-16 flex items-center px-4 lg:px-8 shrink-0 grow-0">
      <Link
        href={routes.dashboard}
        className="flex gap-2 items-center justify-center"
      >
        <Logo />
        <span className="text-xl tracking-wide font-bold">PULSE</span>
      </Link>
      <Suspense fallback={<AuthLoader className="ml-auto" />}>
        <AuthButtons className="ml-auto" />
      </Suspense>
    </header>
  );
}
