"use client";

import {
  RegisterLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "../ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import routes, { baseUrl } from "@/config/routes";
import { EventDetail } from "@/lib/prisma/validators/eventValidators";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useCallback, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import debounce from "lodash.debounce";
import { useIsParticipatingView } from "@/hooks/useIsParticipatingView";

type BookmarkEventButtonProps = {
  event: EventDetail;
};

export function BookmarkEventButton({ event }: BookmarkEventButtonProps) {
  const { user } = useKindeBrowserClient();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const isParticipatingView = useIsParticipatingView();

  useEffect(() => {
    setIsBookmarked(
      event.bookmarkedBy.some(
        (bookmarkedUser) => bookmarkedUser.id === user?.id
      )
    );
  }, [event.bookmarkedBy, user?.id]);

  const handleBookmark = () => {
    toggleClientBookmark();
    performBookmark();
  };

  const toggleClientBookmark = () => {
    const wasBookmarked = isBookmarked;
    setIsBookmarked((prev) => !prev);
    toast({
      description: wasBookmarked
        ? "Event removed from Bookmarks"
        : "Event added to Bookmarks",
    });
  };

  const performBookmark = useCallback(
    debounce(
      () => {
        console.log("Bookmarked event");
      },
      1000,
      { leading: true, trailing: false }
    ),
    [event.id]
  );

  if (!isParticipatingView) {
    return null;
  }

  if (!user) {
    return (
      <RegisterLink
        postLoginRedirectURL={`${baseUrl}${routes.event({
          eventSlug: event.slug,
          ownerId: event.ownerId,
        })}`}
      >
        <Button variant={"outline"} className="rounded-full">
          <Bookmark className="size-4" />
        </Button>
      </RegisterLink>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleBookmark}
            variant={"outline"}
            className="rounded-full"
          >
            {isBookmarked ? (
              <BookmarkCheck className="size-4" />
            ) : (
              <Bookmark className="size-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-black text-white text-sm">
          {isBookmarked ? "Remove from Bookmarks" : "Add to Bookmarks"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
