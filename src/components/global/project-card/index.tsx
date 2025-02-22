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
import { toast } from "sonner";
import { deleteProject, recoverProject } from "@/actions/projects";

type Props = {
  projectId: string;
  title: string;
  createAt: string;
  isDelete?: boolean;
  slideData?: JsonValue;
  themeName: string;
};

const ProjectCard = ({
  projectId,
  title,
  createAt,
  isDelete,
  slideData,
  themeName,
}: Props) => {
  const [loading, setloading] = useState(false);
  const [open, setopen] = useState(false);
  const route = useRouter();
  const { setSlides } = useSlideStore();
  const handleNavagation = () => {
    // setSlides(JSON.parse(JSON.stringify(slideData)));
    console.log("click");
    route.push(`/presentation/${projectId}`);
  };
  const theme = themes.find((theme) => theme.name === themeName) || themes[0];
  const handleRecover = async () => {
    setloading(true);
    if (!projectId) {
      setloading(false);
      toast("Error! ", { description: "Project not Found" });
      return;
    }
    try {
      const res = await recoverProject(projectId);
      if (res.status !== 200) {
        // throw new Error("Failed to recover project");
        toast.error("Oppse!", {
          description: res.error || "Fail to recover project",
        });
        return;
      }
      setopen(false);
      route.refresh();
      toast.success("Success", {
        description: "Project recovered successfully",
      });
    } catch (error) {
      console.log(error);
      toast.error("Oppse!", {
        description: " Failed to recover project",
      });
    }
  };
  const handleDelete = async () => {
    setloading(true);
    if (!projectId) {
      setloading(false);
      toast("Error! ", { description: "Project not Found" });
      return;
    }
    try {
      const res = await deleteProject(projectId);
      if (res.status !== 200) {
        // throw new Error("Failed to recover project");
        toast.error("Oppse!", {
          description: res.error || "Failed to delete project",
        });
        return;
      }
      setopen(false);
      route.refresh();
      toast.success("Success", {
        description: "Project delete successfully",
      });
    } catch (error) {
      console.log(error);
      toast.error("Oppse!", {
        description: " Failed to delete project",
      });
    }
  };
  return (
    <motion.div
      variants={itemVarients}
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
        !isDelete && "hover:bg-muted/50"
      }`}
    >
      <div
        className=" relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        // onClick={handleNavagation}
      >
        {/* <ThumnailPreview
          theme={theme}
          // slide={JSON.parse(JSON.stringify(slideData))?.[0]}
        ></ThumnailPreview> */}
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
                    className=" bg-background-80 text-white dark:hover:bg-background"
                    disabled={loading}
                  >
                    Recover
                  </Button>
                </AlertDialogBox>
              ) : (
                <AlertDialogBox
                  description="This will delete your project and send to Trash"
                  className=" bg-red-500 text-white dark:bg-red-600 hover:bg-red-500 dark:hover:bg-red-700"
                  loading={loading}
                  open={open}
                  onClick={handleDelete}
                  handleOpen={() => {
                    setopen(!open);
                  }}
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    className=" bg-background-80 text-white dark:hover:bg-background"
                    disabled={loading}
                  >
                    Delete
                  </Button>
                </AlertDialogBox>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
