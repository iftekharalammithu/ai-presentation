import { getAllProject } from "@/actions/projects";
import React from "react";
import { clerkMiddleware } from "@clerk/nextjs/server";
import NotFound from "@/components/global/not-found";
import Projects from "@/components/global/projects";

const DashboardPage = async () => {
  const allProject = await getAllProject();

  return (
    <div className="w-full flex flex-col gap-6 relative p-4 md:p-0">
      <div className="w-full flex flex-col-reverse items-start  gap-6 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
            Projects
          </h1>
          <p className="text-base font-normal dark:text-slate-600">
            All of your work in one place
          </p>
        </div>
      </div>
      {/* {Projects} */}
      {allProject.data && allProject.data.length > 0 ? (
        <Projects></Projects>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default DashboardPage;
