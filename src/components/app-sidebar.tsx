"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { useState, useEffect } from "react"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      title: "Manage Product",
      url: "/dashboard/manage-products",
    },
    {
      title: "Add Product",
      url: "/dashboard/add-product",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const user = useAuth();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayName = mounted ? (user?.name ?? "Guest") : "Guest";
  const displayEmail = mounted ? (user?.email ?? "") : "";

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard/profile">
                <div className="flex rounded-full size-8 items-center justify-center bg-indigo-800 text-sidebar-primary-foreground">
                  S
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">{displayName}</span>
                  <span className="">{displayEmail}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} className="font-medium">
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
