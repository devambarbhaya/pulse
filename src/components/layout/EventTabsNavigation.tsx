"use client";

import { cn, PropsWithClassName } from "@/lib/utils/ui-utils";
import { Event } from "@prisma/client";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import routes from "@/config/routes";

type EventTabsNavigationProps = PropsWithClassName<{
  ownerId: Event["ownerId"];
  eventSlug: Event["slug"];
}>;

export function EventTabsNavigation({
  eventSlug,
  ownerId,
  className,
}: EventTabsNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isQAtab = pathname === routes.event({ ownerId, eventSlug });
  const isPollsTab = pathname === routes.eventPolls({ ownerId, eventSlug });

  return (
    <div className={cn("flex", className)}>
      {["Q&A", "Polls"].map((tab) => (
        <Button
          key={tab}
          variant={"outline"}
          className={cn("basis-1/2 bg-gray-100 rounded-t-lg rounded-b-none", {
            "bg-white": tab === "Q&A" ? isQAtab : isPollsTab,
          })}
          onClick={() =>
            router.replace(
              tab === "Q&A"
                ? routes.event({ ownerId, eventSlug })
                : routes.eventPolls({ ownerId, eventSlug })
            )
          }
        >
          {tab}
        </Button>
      ))}
    </div>
  );
}
