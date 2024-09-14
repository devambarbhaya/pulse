import { usePathname, useRouter } from "next/navigation";
import { sidebarItems } from "./DashboardSidebar";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils/ui-utils";
import { buttonVariants } from "../ui/button";
import { SidebarItem } from "./SidebarItem";

export function DashboardSidebarContent() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full py-8 px-3">
      <nav className="flex flex-col gap-y-2">
        {sidebarItems.map((item) => {
          const isActive = item.route === pathname;

          return (
            <button key={item.name} onClick={() => router.replace(item.route)}>
              <SidebarItem
                icon={item.Icon}
                text={item.name}
                isActive={isActive}
              />
            </button>
          );
        })}
      </nav>
      <div className="mt-auto w-full">
        <LogoutLink
          className={cn(buttonVariants({ variant: "outline" }), "w-full")}
        >
          <LogOut className="size-4" />
          <span className="ml-2">Log Out</span>
        </LogoutLink>
      </div>
    </div>
  );
}
