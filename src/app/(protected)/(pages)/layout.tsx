import { getAllProject } from "@/actions/projects";
import { onAuthenticateUser } from "@/actions/user";
import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const recent_Projects = await getAllProject();
  const checkUser = await onAuthenticateUser();

  if (!checkUser.user) {
    redirect("/sign-in");
  }
  return <SidebarProvider>
    <AppSidebar></AppSidebar>
  </SidebarProvider>>
};

export default Layout;
