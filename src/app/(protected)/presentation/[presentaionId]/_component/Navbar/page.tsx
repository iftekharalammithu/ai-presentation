"use client";
import { useSlideStore } from "@/store/useSlideStore";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, Play, Share } from "lucide-react";
import { toast } from "sonner";

type Props = {
  presentation: string;
};

const Navbar = ({ presentation }: Props) => {
  const { currentTheme } = useSlideStore();
  const [isPresentation, setIsPresentation] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/share/${presentation}}`
    );
    toast.success("Copied to clipboard", {
      description: "Copied to clipboard",
    });
  };

  return (
    <nav
      className=" fixed top-0 left-0 ring-0 z-50 w-full h-20 flex justify-between items-center py-4 px-7 "
      style={{
        backgroundColor:
          currentTheme.navbarColor || currentTheme.backgroundColor,
        color: currentTheme.accentColor,
      }}
    >
      <Link href={"/dashboard"} passHref>
        <Button
          className={` flex items-center gap-2`}
          variant={"outline"}
          style={{
            backgroundColor: currentTheme.backgroundColor,
          }}
        >
          <Home className=" w-4 h-4"></Home>
          <span className=" hidden sm:inline">Return Home</span>
        </Button>
      </Link>
      <Link
        href={"/presentation/template-market"}
        className=" text-lg font-semibold hidden sm:block"
      >
        Presentation Editor
      </Link>
      <div className="flex items-center gap-4">
        <Button
          style={{
            backgroundColor: currentTheme.backgroundColor,
          }}
          variant={"outline"}
          onClick={handleCopy}
        >
          <Share className=" w-4 h-4"></Share>
        </Button>
        {/* <SellTemplate></SellTemplate> */}
        <Button
          variant={"default"}
          className=" flex items-center gap-2"
          onClick={() => setIsPresentation(true)}
        >
          <Play className=" w-4 h-4"></Play>
          <span className=" hidden sm:inline">Present</span>
        </Button>
      </div>
      {
        // isPresentation && <PresentationMode></PresentationMode>
      }
    </nav>
  );
};

export default Navbar;
