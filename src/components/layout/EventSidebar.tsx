"use client";

import routes from "@/config/routes";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Event } from "@prisma/client";
import { SidebarItem } from "./SidebarItem";
import { usePathname, useRouter } from "next/navigation";
import { BarChart, MessageCircleMore } from "lucide-react";
import { EventViewModeSelect } from "../select/EventViewModeSelect";
import { useIsParticipatingView } from "@/hooks/useIsParticipatingView";

type EventSidebarProps = {
  eventSlug: Event["slug"];
  ownerId: Event["ownerId"];
  questionsCount: number;
  pollsCount: number;
};

export function EventSidebar({
  eventSlug,
  ownerId,
  pollsCount,
  questionsCount,
}: EventSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useKindeBrowserClient();
  const questionsRoute = routes.event({ ownerId, eventSlug });
  const pollsRoute = routes.eventPolls({ ownerId, eventSlug });
  const isAdmin = user?.id === ownerId;
  const isParticipantView = useIsParticipatingView();

  return (
    <div className="w-[220px] drop-shadow-md h-full rounded-xl bg-white">
      <div className="flex flex-col h-full pt-8 px-3 pb-3">
        <nav className="flex flex-col gap-3 h-full">
          <button onClick={() => router.replace(questionsRoute)}>
            <SidebarItem
              isActive={pathname === questionsRoute}
              text="Q&A"
              icon={MessageCircleMore}
            >
              <span className="ml-auto">{questionsCount}</span>
            </SidebarItem>
          </button>
          <button onClick={() => router.replace(pollsRoute)}>
            <SidebarItem
              isActive={pathname === pollsRoute}
              text="Polls"
              icon={BarChart}
            >
              <span className="ml-auto">{pollsCount}</span>
            </SidebarItem>
          </button>
        </nav>
        {isAdmin && (
          <div className="mt-auto space-y-4 w-full">
            <EventViewModeSelect key={String(isParticipantView)} />
          </div>
        )}
      </div>
    </div>
  );
}
