import type { Metadata } from "next";
import SidebarDashboard from "./dashboard/sidebar";
import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden w-full">
        <SidebarDashboard />
        <div className="flex-1 overflow-auto px-4 w-full">
          <div className="container mx-auto py-8">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}