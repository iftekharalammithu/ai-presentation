import React from "react";
import { User } from "@prisma/client";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import UpperInfoSearchbar from "./upper-info-searchbar";
import ThemeSwitcher from "../global/mode-toggle";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";
import NewProjectButton from "./new-project-buttom";

type Props = {
  user: User;
};

const UpperInfoBar = ({ user }: Props) => {
  return (
    <header className="sticky top-0 z-[10] flex shrink-0 flex-wrap items-center gap-2   p-4 justify-between">
      <SidebarTrigger className=" ml-1"></SidebarTrigger>
      <Separator orientation="vertical" className="mr-2 h-4"></Separator>
      <div className=" w-full max-w-[95%] flex items-center justify-between gap-4 flex-wrap">
        <UpperInfoSearchbar></UpperInfoSearchbar>
        <ThemeSwitcher></ThemeSwitcher>
        <div className="flex flex-wrap gap-4 items-center justify-end">
          <Button className=" bg-background-90 rounded-lg hover:bg-background-80 text-primary font-semibold cursor-not-allowed">
            <Upload></Upload>
            Import
          </Button>
          <NewProjectButton user={user}></NewProjectButton>
        </div>
      </div>
    </header>
  );
};

export default UpperInfoBar;
