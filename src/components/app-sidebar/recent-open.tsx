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
import { toast } from "sonner";
import { useRouter } from "next/router";

type Props = {
  recentProjects: Project[];
};

const RecentOpen = ({ recentProjects }: Props) => {
  const router = useRouter();

  const handleClick = (projectId: string, slides: JsonValue) => {
    console.log(projectId);
    if (!projectId || !slides) {
      toast("Project Not Found", {
        description: "Please try again later",
      });
      return;
    }
    setSlides(JSON.parse(JSON.stringify(slides)));
    router.push(`/presentation/${projectId}`);
  };
  return (
    <>
      {recentProjects.length > 0 ? (
        <SidebarGroup>
          <SidebarGroupLabel>Recent Opened</SidebarGroupLabel>
          <SidebarMenu>
            {recentProjects.map((project) => (
              <SidebarMenuItem key={project.id}>
                <SidebarMenuButton
                  asChild
                  tooltip={project.title}
                  className={`hover:bg-primary-80`}
                >
                  <Button
                    variant={"link"}
                    onClick={() => handleClick(project.id, project.slides)}
                    className={`text-xs items-center justify-center`}
                  >
                    <span>{project.title}</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ) : (
        ""
      )}
    </>
  );
};

export default RecentOpen;
