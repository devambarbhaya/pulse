import { cn, PropsWithClassName } from "@/lib/utils/ui-utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Users } from "lucide-react";

type ParticipantsTooltipProps = PropsWithClassName<{
  participantsCount: number;
}>;

export function ParticipantsTooltip({
  participantsCount,
  className,
}: ParticipantsTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={cn(
              "inline-flex gap-x-2 rounded-lg items-center text-xs cursor-pointer hover:bg-slate-100 lg:text-sm",
              className
            )}
          >
            <Users className="size-5 lg:size-6" />
            <span className="lining-nums">{participantsCount}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-black text-white text-sm">
          <p>{participantsCount} people have joined this event!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
