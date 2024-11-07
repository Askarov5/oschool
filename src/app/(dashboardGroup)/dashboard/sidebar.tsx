"use client";

import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Layers,
  PlusCircle,
  Settings,
  LogOut,
  Shapes,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Test Preps", icon: GraduationCap, href: "/dashboard/test-preps" },
  { name: "Subjects", icon: BookOpen, href: "/dashboard/subjects" },
  { name: "Curriculum", icon: Layers, href: "/dashboard/curriculum" },
  { name: "Courses", icon: Shapes, href: "/dashboard/courses" },
  { name: "Add-ons", icon: PlusCircle, href: "/dashboard/add-ons" },
];

export default function SidebarDashboard() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-2xl font-bold px-4 py-2">EduPlatform</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
