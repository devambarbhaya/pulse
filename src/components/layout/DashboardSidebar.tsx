"use client";

import routes from "@/config/routes";
import { cn, PropsWithClassName } from "@/lib/utils/ui-utils";
import { Bookmark, Component, Menu, User } from "lucide-react";
import { DashboardSidebarContent } from "./DashboardSidebarContent";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const sidebarItems = [
  {
    name: "Events",
    route: routes.dashboard,
    Icon: Component,
  },
  {
    name: "Bookmarks",
    route: routes.bookmarks,
    Icon: Bookmark,
  },
  {
    name: "Account",
    route: routes.account,
    Icon: User,
  },
] as const;

export function DesktopDashboardSidebar({ className }: PropsWithClassName) {
  return (
    <aside
      className={cn(
        "border-r-blue-500/30 h-full shrink-0 grow-0 bg-white border-r hidden lg:block lg:basis-[250px]",
        className
      )}
    >
      <DashboardSidebarContent />
    </aside>
  );
}

export function MobileDashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="pl-4 pt-4 lg:hidden">
        <div className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
          <Menu className="size-5 ml-2" />
          <span>Menu</span>
        </div>
      </SheetTrigger>
      <SheetContent className="w-[250px] p-0 pt-2" side={"left"}>
        <DashboardSidebarContent />
      </SheetContent>
    </Sheet>
  );
}
