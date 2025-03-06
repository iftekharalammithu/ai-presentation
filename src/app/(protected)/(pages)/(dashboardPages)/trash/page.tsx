import React from "react";
import DeleteAllButton from "./_component/DeleteAllButton";
import { getDeleteProjects } from "@/actions/projects";
import NotFound from "@/components/global/not-found";
import Projects from "@/components/global/projects";

const Page = async () => {
  const deleteProjects = await getDeleteProjects();

  if (!deleteProjects.data) {
    return <NotFound></NotFound>;
  }
  return (
    <div className=" flex flex-col gap-6 relative">
      <div className=" flex justify-between items-center">
        <div className=" flex flex-col items-start">
          <h1 className=" text-2xl font-semibold dark:text-primary backdrop-blur-lg">
            Trash
          </h1>
          <p className=" text-base font-normal dark:text-secondary">
            All your deleted Presentations
          </p>
        </div>
        <DeleteAllButton Projects={deleteProjects.data}></DeleteAllButton>
      </div>
      {deleteProjects.data.length > 0 ? (
        <Projects projects={deleteProjects.data}></Projects>
      ) : (
        <NotFound></NotFound>
      )}
    </div>
  );
};

export default Page;
