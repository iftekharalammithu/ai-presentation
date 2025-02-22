"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { User } from "@clerk/nextjs/server";

const NewProjectButton = ({ user }: { user: User }) => {
  const route = useRouter();
  return (
    <Button
      className=" bg-background-90 rounded-lg hover:bg-background-80 text-primary font-semibold cursor-not-allowed"
      disabled={!user?.subscription}
      onClick={() => route.push("/create-page")}
    >
      <Plus></Plus>
      New Project
    </Button>
  );
};

export default NewProjectButton;
