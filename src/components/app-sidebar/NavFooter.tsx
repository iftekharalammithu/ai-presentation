"use client";
import React, { useState } from "react";
import { User } from "@prisma/client";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

type Props = {
  prismaUser: User;
};

const NavFooter = ({ prismaUser }: Props) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const handleUpgrading = async () => {
    console.log("click");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-col  gap-y-6 items-start group-data-[collapsable=icon]:hidden ">
          {/* Subscription Section */}
          {!prismaUser.subscription && (
            <div className="flex flex-col items-start p-2 pb-3 gap-4 bg-background-80 rounded-lg  ">
              <div className="flex  flex-col items-start gap-1">
                <p className="text-base font-bold ">
                  Get <span className="text-vivid">Creative AI</span>
                </p>
                <span className="text-sm dark:text-slate-600">
                  Unlock all features including AI and more
                </span>
              </div>
              <div className="w-full bg-vivid-gradient p-[1px] rounded-full">
                <Button
                  className="w-full border-vivid bg-background-80 hover:bg-background-90 text-primary rounded-full font-bold"
                  variant={"default"}
                  size={"lg"}
                  onClick={handleUpgrading}
                >
                  {loading ? "Upgrading..." : "Upgrade"}
                </Button>
              </div>
            </div>
          )}

          {/* User Section */}
          <SignedIn>
            <SidebarMenuButton
              className="data-[state=open]:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent"
              size={"lg"}
            >
              <UserButton />
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsable=icon]:hidden">
                <span className="truncate font-semibold">{user?.fullName}</span>
                <span className="truncate text-slate-600">
                  {user?.emailAddresses[0]?.emailAddress || ""}
                </span>
              </div>
            </SidebarMenuButton>
          </SignedIn>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavFooter;
