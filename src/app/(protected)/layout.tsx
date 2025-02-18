export const dynamic = "force-dynamic";
import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const auth = await onAuthenticateUser();

  if (!auth.user) {
    redirect("/sign-in");
  }
  return <div className="w-full min-h-screen">{children}</div>;
};

export default Layout;
