import { UserEventsList } from "@/components/EventsList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getUserEvents } from "@/lib/server/getUserEvents";
import { Plus } from "lucide-react";

export default async function EventsPage() {
  const initialEvents = await getUserEvents();

  return (
    <ScrollArea className="h-full w-full px-4 py-2">
      <h2 className="text-2xl font-bold mb-2 mt-4 ml-4">Your Events</h2>
      <div className="h-full grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
        {/* TODO: Implement the dialog event creation */}
        <button className="h-24 md:h-36 bg-white/50 border-[3px] border-spacing-4 border-dashed grid place-items-center group">
          <span className="inline-flex flex-col items-center gap-x-1 font-medium group group-hover:text-blue-600 transition-colors duration-150">
            <Plus className="size-5" />
            <span>New Event</span>
          </span>
        </button>
        <UserEventsList initialEvents={initialEvents} />
      </div>
    </ScrollArea>
  );
}
