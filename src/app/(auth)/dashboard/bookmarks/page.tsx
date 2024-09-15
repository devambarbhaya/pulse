import { BookmarkedEventsList } from "@/components/EventsList";
import { NoContent } from "@/components/Illustrations";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getUserBookmarkedEvents } from "@/lib/server/getUserBookmarkedEvents";

export default async function BookmarksPage() {
  const initialBookmarkedEvents = await getUserBookmarkedEvents();

  return (
    <ScrollArea className="w-full h-full px-4 py-2">
      <h2 className="text-2xl font-bold mb-8 mt-4 ml-4">Bookmarked Events</h2>
      <div className="relative h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
        {initialBookmarkedEvents.length === 0 ? (
          <NoContent>
            <p>You haven&apos;t bookmarked any events yet.</p>
          </NoContent>
        ) : (
          <BookmarkedEventsList initialEvents={initialBookmarkedEvents} />
        )}
      </div>
    </ScrollArea>
  );
}
