import Link from "next/link";
import { Card, CardContent, CardHeader } from "./ui/card";
import { cn, PropsWithClassName } from "@/lib/utils/ui-utils";
import { EventDetail } from "@/lib/prisma/validators/eventValidators";
import { Users } from "lucide-react";

export function EventCard({
  event,
  className,
}: PropsWithClassName<{ event: EventDetail }>) {
  const questionsCount = event._count.questions;
  const participantsCount = event._count.participants;
  const pollsCount = event._count.polls;

  return (
    <Link href={"#"} prefetch={false}>
      <Card
        className={cn(
          "rounded-none border-l-[4px] border-b-0 border-t-0 border-r-0 border-gray-400/80",
          className
        )}
      >
        <CardHeader>
          <div className="flex justify-between">
            <h4 className="text-base font-semibold line-clamp-2">
              {event.displayName}
            </h4>
          </div>
          <div className="flex justify-between text-[12px] text-gray-400 font-medium">
            <span>
              <span>Q&A: {questionsCount}</span>
              <span className="mx-2">&bull;</span>
              <span>Polls: {pollsCount}</span>
            </span>
            <span className="inline-flex gap-x-1 items-center font-bold">
              <Users className="size-3" />
              <span>{participantsCount} Participants</span>
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-gray-400 line-clamp-2">
            {event.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
