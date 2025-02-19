import { getAllProject, getRecentProject } from "@/actions/projects";
import { onAuthenticateUser } from "@/actions/user";
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const getAllProjects = await getAllProject();
  const checkUser = await onAuthenticateUser();
  const recentProjects = await getRecentProject();

  if (!checkUser.user) {
    redirect("/sign-in");
  }
  return (
    <SidebarProvider>
      <AppSidebar
        recentProjects={recentProjects.data || []}
        user={checkUser.user}
      ></AppSidebar>
    </SidebarProvider>
  );
};

export default Layout;
