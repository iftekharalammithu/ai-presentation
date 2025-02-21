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
          src={
            project.thumbnail ||
            "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        ></ProjectCard>
      ))}
    </motion.div>
  );
};

export default Projects;
