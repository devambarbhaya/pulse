import { getUserInfo } from "@/lib/server/getUserInfo";
import { onlyDateFormatter } from "@/lib/utils/date-utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function AccountPage() {
  const { getUser } = await getKindeServerSession();
  const kindeUser = await getUser();

  if (!kindeUser || !kindeUser.id) {
    throw new Error("Invalid user!");
  }

  const user = await getUserInfo(kindeUser.id);

  if (!user || !user.id) {
    throw new Error("Invalid user!");
  }

  return (
    <div className="w-full h-full flex flex-col items-center mt-32">
      <h1 className="text-2xl font-bold mt-3">{user.displayName}</h1>
      <time className="text-xs text-gray-500" suppressHydrationWarning>
        Member since {onlyDateFormatter.format(user.createdAt)}
      </time>
      <ul className="text-sm text-muted-foreground mt-6 space-y-1">
        <li>Events: {user._count.events}</li>
        <li>Questions Asked: {user._count.questions}</li>
        <li>Participating: {user._count.participations}</li>
        <li>Bookmarked Events: {user._count.bookmarks}</li>
      </ul>
    </div>
  );
}
