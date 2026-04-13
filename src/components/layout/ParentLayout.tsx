import React from "react";
import { Outlet } from "@tanstack/react-router";
import { AppSidebar } from "./AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function ParentLayout() {
  return (
    <SidebarProvider
      style={{ "--sidebar-width-icon": "4rem" } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset className="bg-gradient-to-br from-primary/[0.04] to-brand-green/[0.04]">
        <header className="flex h-14 shrink-0 items-center border-b bg-background/70 backdrop-blur-sm px-4">
          <SidebarTrigger />
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
