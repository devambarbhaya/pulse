import routes from "@/config/routes";
import { getUserInfo } from "@/lib/server/getUserInfo";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Bell } from "lucide-react";
import Link from "next/link";
import { UserAvatar } from "../UserAvatar";
import { cn, PropsWithClassName } from "@/lib/utils/ui-utils";
import { PublicAuthButtons } from "./PublicAuthButtons";

export async function AuthButtons({ className }: PropsWithClassName) {
  const kindeUser = await getKindeServerSession().getUser();

  const user = kindeUser && (await getUserInfo(kindeUser.id));

  // TODO: Retrieve user notifications information
  return user ? (
    <div className={cn("inline-flex gap-x-7 items-center", className)}>
      {/* TODO: Replace with real implementation */}
      <Bell className="size-5" />
      <Link href={routes.dashboard} prefetch={false}>
        <UserAvatar
          displayName={user.displayName}
          color={user.color}
          className="ring-2 ring-white"
        />
      </Link>
    </div>
  ) : (
    <PublicAuthButtons className={className} />
  );
}
