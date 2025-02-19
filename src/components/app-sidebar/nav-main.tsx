"use client";
import React, { FC } from "react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

// type props = {};

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

interface NavMainProps {
  items: NavItem[];
}

const NavMain = ({ items }: NavMainProps) => {
  const pathname = usePathname();
  // console.log(items);
  return (
    <SidebarGroup className=" p-0">
      <SidebarMenu>
        {items.map((item, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              className={`${pathname.includes(item.url) && "bg-muted"}`}
            >
              <Link
                href={item.url}
                className={`text-lg ${
                  pathname.includes(item.url) && "font-bold"
                }`}
              >
                {React.createElement(item.icon)}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;
