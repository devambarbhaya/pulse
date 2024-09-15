import { EventDetail } from "@/lib/prisma/validators/eventValidators";
import { EventCard } from "./EventCard";

type EventsListProps = {
  initialEvents: EventDetail[];
};

export function UserEventsList({ initialEvents }: EventsListProps) {
  return initialEvents.map((event) => (
    <EventCard key={event.id} event={event} className="h-36" />
  ));
}

export function BookmarkedEventsList({ initialEvents }: EventsListProps) {
  return initialEvents.map((event) => (
    <EventCard key={event.id} event={event} className="h-36" />
  ));
}
