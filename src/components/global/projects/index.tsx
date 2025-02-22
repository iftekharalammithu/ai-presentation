import { Project } from "@prisma/client";
import React from "react";
import { motion } from "framer-motion";
import { containVarients } from "@/lib/constants";
import ProjectCard from "../project-card";
type Props = {
  projects: Project[];
};
const Projects = ({ projects }: Props) => {
  return (
    <motion.div
      className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 "
      variants={containVarients}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          projectId={project?.id}
          title={project?.title}
          createAt={project?.createdAt.toString()}
          isDelete={project?.isDeleted}
          slideData={project?.slides}
          themeName={project?.themeName}
        ></ProjectCard>
      ))}
    </motion.div>
  );
};

export default Projects;
