import { BookmarkEventButton } from "@/components/buttons/BookmarkEventButton";
import { CopyEventLinkButton } from "@/components/buttons/CopyEventLinkButton";
import { EventAdminMenu } from "@/components/menu/EventAdminMenu";
import { ParticipantsTooltip } from "@/components/tooltip/ParticipantsTooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/UserAvatar";
import routes from "@/config/routes";
import { getEventDetail } from "@/lib/server/getEventDetail";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

type EventLayoutProps = PropsWithChildren<{
  params: {
    ownerId: string;
    eventSlug: string;
  };
}>;

export const dynamic = "force-dynamic";

export default async function EventLayout({
  children,
  params: { ownerId, eventSlug },
}: EventLayoutProps) {
  const event = await getEventDetail({ ownerId, eventSlug });

  if (!event) {
    return notFound();
  }

  const { owner } = event;
  const showDescription = event.description && event.description.length > 0;

  return (
    <div className="flex flex-col items-start h-full pt-8 px-4 lg:px-8">
      <Link
        href={routes.dashboard}
        className="text-xs underline underline-offset-2"
      >
        <ArrowLeft className="size-3 mr-2 inline-block" />
        <span>Back to Events</span>
      </Link>
      {/* Top Header */}
      <div className="w-full flex flex-col mt-3 lg:flex-row lg:shrink-0 lg:justify-between">
        <div>
          {/* Event name and description */}
          <h2 className="font-bold text-2xl lg:text-3xl">
            {event.displayName}
          </h2>
          {showDescription && (
            <p className="text-muted-foreground line-clamp-1 text-sm mt-2">
              {event.description}
            </p>
          )}
          {/* EVent Organizer */}
          <div className="inline-flex items-center gap-x-2 mt-2">
            <span className="text-xs lg:text-sm">
              <span className="text-slate-600">Organized by </span>
              <span className="font-semibold">{owner.displayName}</span>
            </span>
            <UserAvatar
              className="size-6"
              displayName={owner.displayName}
              color={owner.color}
            />
          </div>
        </div>
        {/* Participants and Event Action Buttons */}
        <div className="flex items-baseline justify-between lg:items-center lg:mr-8 lg:self-end">
          <ParticipantsTooltip
            className="mr-7"
            participantsCount={event._count.participants}
          />
          <div className="inline-flex items-center gap-x-2 mt-6 lg:mt-0">
            <CopyEventLinkButton
              eventSlug={event.slug}
              ownerId={event.ownerId}
            />
            <BookmarkEventButton event={event} />
            <EventAdminMenu event={event} />
          </div>
        </div>
      </div>
      {/* Main content: Either Q&A or Polls */}
      <div className="w-full h-full overflow-auto pb-4">
        <ScrollArea className="relative h-full bg-white px-2.5 py-4 rounded-b-lg lg:rounded-lg lg:p-6">
          {children}
        </ScrollArea>
      </div>
    </div>
  );
}
