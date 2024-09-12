import routes from "@/config/routes";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const { isAuthenticated } = await getKindeServerSession();

  if (!isAuthenticated) {
    redirect(routes.login);
  }

  return <div>{children}</div>;
}
