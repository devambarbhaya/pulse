"use client";

import { Edit, Settings, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn, PropsWithClassName } from "@/lib/utils/ui-utils";
import { EventDetail } from "@/lib/prisma/validators/eventValidators";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useState } from "react";
import { DeleteEventDialog } from "../dialogs/DeleteEventDialog";

type EventAdminMenuProps = PropsWithClassName<{
  event: EventDetail;
}>;

export function EventAdminMenu({ event, className }: EventAdminMenuProps) {
  const { user } = useKindeBrowserClient();
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const isAdmin = user?.id === event.ownerId;
  const isParticipantView = false;

  if (isParticipantView || !isAdmin) {
    return null;
  }

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full text-black" variant={"outline"}>
            <Settings className={cn("size-4", className)} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2 space-y-1">
          <DropdownMenuItem className="text-sm">
            <Edit className="size-4 mr-2" />
            <span>Edit Event</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setOpenDeleteDialog(true)}
            className="text-sm text-destructive"
          >
            <Trash className="size-4 mr-2" />
            <span>Delete Event</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* TODO: Implement Dialogs for Edit */}
      <DeleteEventDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        eventId={event.id}
      />
    </>
  );
}
