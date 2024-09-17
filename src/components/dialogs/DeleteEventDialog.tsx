import { Event } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { cn } from "@/lib/utils/ui-utils";
import { buttonVariants } from "../ui/button";

type DeleteEventDialogProps = {
  eventId: Event["id"];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteEventDialog({
  eventId,
  onOpenChange,
  open,
}: DeleteEventDialogProps) {
  const isFieldDisabled = false; // TODO: Implement dynamic disabling

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all your
            event&apos;s questions and polls and related data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isFieldDisabled}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isFieldDisabled}
            onClick={() => {}} // TODO: Implement deletion logic
            className={cn(buttonVariants({ variant: "destructive" }))}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
