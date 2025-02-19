"use client";
import React from "react";

import { Project } from "@prisma/client";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Button } from "../ui/button";

type Props = {
  recentProjects: Project[];
};

const RecentOpen = ({ recentProjects }: Props) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Recent Opened</SidebarGroupLabel>
      <SidebarMenu>
        {recentProjects.length > 0 ? (
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip={"Test"}
              className={`hover:bg-primary-80`}
            >
              <Button
                variant={"link"}
                //   onClick={}
                className={`text-xs items-center justify-center`}
              >
                <span>Testing</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ) : (
          ""
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default RecentOpen;
