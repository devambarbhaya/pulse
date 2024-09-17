"use client";

import { Link } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import copy from "copy-to-clipboard";
import { Event } from "@prisma/client";
import { toast } from "@/hooks/use-toast";
import { getEventLink } from "@/lib/utils/events-utils";

type CopyEventLinkButtonProps = {
  ownerId: Event["ownerId"];
  eventSlug: Event["slug"];
};

export function CopyEventLinkButton({
  eventSlug,
  ownerId,
}: CopyEventLinkButtonProps) {
  const handleCopy = () => {
    copy(getEventLink({ ownerId, eventSlug }));
    toast({
      description: "Event link copied to clipboard",
      variant: "default",
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleCopy}
            variant={"outline"}
            className="rounded-full"
          >
            <Link className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-black text-white text-sm">
          Copy link to clipboard
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
