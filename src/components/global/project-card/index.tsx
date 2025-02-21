"use client";
import { itemVarients, themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { JsonValue } from "@prisma/client/runtime/library";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";
import ThumnailPreview from "./thumnail-preview";

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
          slide={JSON.parse(JSON.stringify(slideData))?.[0]}
        ></ThumnailPreview>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
