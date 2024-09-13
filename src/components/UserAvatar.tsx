import { PropsWithClassName } from "@/lib/utils/ui-utils";
import { Avatar, AvatarFallback } from "./ui/avatar";

type UserAvatarProps = PropsWithClassName<{
  displayName: string;
  color: string;
}>;

const getFullNameInitials = (name: string) => {
  const initials = name.match(/\b\w/g) || [];

  return initials.join("").toUpperCase();
};

export function UserAvatar({ displayName, color, className }: UserAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarFallback
        style={{
          backgroundColor: color,
        }}
        className="text-white text-xs"
      >
        {getFullNameInitials(displayName)}
      </AvatarFallback>
    </Avatar>
  );
}
