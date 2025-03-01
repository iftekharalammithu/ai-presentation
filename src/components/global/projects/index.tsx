"use client";
import { containVarients } from "@/lib/constants";
import ProjectCard from "../project-card";
import { motion } from "framer-motion";
import { Project } from "@prisma/client";

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
          src={project.thumbnail}
        ></ProjectCard>
      ))}
    </motion.div>
  );
};

export default Projects;
