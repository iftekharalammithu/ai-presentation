"use client";
import { itemVarients, themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { JsonValue } from "@prisma/client/runtime/library";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ThumnailPreview from "./thumnail-preview";
import { timeAgo } from "@/lib/utils";
import AlertDialogBox from "../alert-dialog";
import { Button } from "@/components/ui/button";

type Props = {
  projectId: string;
  title: string;
  createAt: string;
  isDelete?: boolean;
  slideData?: JsonValue;
  src: string;
  themeName: string;
};

const ProjectCard = ({
  projectId,
  title,
  createAt,
  isDelete,
  slideData,
  src,
  themeName,
}: Props) => {
  const [loading, setloading] = useState(false);
  const [open, setopen] = useState(false);
  const route = useRouter();
  const { setSlides } = useSlideStore();
  const handleNavagation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    console.log("click");
    route.push(`/presentation/${projectId}`);
  };
  const theme = themes.find((theme) => theme.name === themeName) || themes[0];
  return (
    <motion.div
      variants={itemVarients}
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
        !isDelete && "hover:bg-muted/50"
      }`}
    >
      <div
        className=" relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNavagation}
      >
        <ThumnailPreview
          theme={theme}
          // slide={JSON.parse(JSON.stringify(slideData))?.[0]}
        ></ThumnailPreview>
        <div className=" w-full">
          <div className=" space-y-1">
            <h3 className="font-semibold text-base text-primary line-clamp-1">
              {title}
            </h3>
            <div className="flex w-full justify-between items-center gap-2">
              <p
                className="text-sm text-muted-foreground"
                suppressHydrationWarning
              >
                {timeAgo(createAt)}
              </p>
              {isDelete ? (
                <AlertDialogBox
                  description="This will recoder your project and restore your data"
                  className=" bg-green-500 text-white dark:bg-green-600 hover:bg-green-500 dark:hover:bg-green-700"
                  loading={loading}
                  open={open}
                  onClick={handleRecover}
                  handleOpen={() => {
                    setopen(!open);
                  }}
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    className=" bg-background-80 dark:hover:bg-background"
                    disabled={loading}
                  >
                    Recover
                  </Button>
                </AlertDialogBox>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
