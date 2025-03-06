"use server";

import { client } from "@/lib/prisma";
import { onAuthenticateUser } from "./user";
import { data } from "@/lib/constants";
import { OutlineCard } from "@/lib/types";
import { JsonValue } from "@prisma/client/runtime/library";

export const getAllProject = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, message: "User Not Authenticated}" };
    }
    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    if (projects.length === 0) {
      return { status: 404, message: "No Projects Found" };
    }
    return { status: 200, data: projects };
  } catch (error) {
    console.error("🛑 ️ Error in getAllProject:", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const getRecentProject = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, message: "User Not Authenticated}" };
    }
    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
    });
    if (projects.length === 0) {
      return { status: 404, message: "No Recent Project Found" };
    }
    return { status: 200, data: projects };
  } catch (error) {
    console.error("🛑 ️ Error in getAllProject:", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const recoverProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authenticated" };
    }
    const updateProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        isDeleted: false,
      },
    });
    if (!updateProject) {
      return { status: 404, error: "Failed to Project Recover" };
    }

    return { status: 200, data: updateProject };
  } catch (error) {
    console.error("🛑 ️ Error in recoverProject:", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authenticated" };
    }
    const deleteProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        isDeleted: true,
      },
    });
    if (!deleteProject) {
      return { status: 404, error: "Failed to Project Delete" };
    }
    return { status: 200, data: deleteProject };
  } catch (error) {
    console.error("🛑 ️ Error in deleteProject:", error);

    return { status: 500, error: "Internal Server Error" };
  }
};

export const createProject = async (title: string, outlines: OutlineCard[]) => {
  try {
    if (!title || !outlines || outlines.length === 0) {
      return { status: 400, error: "Title and Outline are required" };
    }
    const allOutlines = outlines.map((ouline) => ouline.title);
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authenticated" };
    }

    const project = await client.project.create({
      data: {
        title,
        userId: checkUser.user.id,
        outlines: allOutlines,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    if (!project) {
      return { status: 500, error: "Failed to Create Project" };
    }
    return { status: 200, data: project };
  } catch (error) {
    console.error("🛑 ️ Error in createProject:", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const getprojectById = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authenticated" };
    }
    const project = await client.project.findFirst({
      where: {
        id: projectId,
      },
    });
    if (!project) {
      return { status: 404, error: "Project Not Found" };
    }
    return { status: 200, data: project };
  } catch (error) {
    console.error("🛑 ️ Error in getprojectById:", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const updateSlides = async (projectId: string, slides: JsonValue) => {
  try {
    if (!projectId || !slides) {
      return { status: 400, error: "Invalid Request" };
    }
    const updatedProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        slides,
      },
    });
    if (!updatedProject) {
      return { status: 500, error: "Failed to Update Project" };
    }
    return { status: 200, data: updatedProject };
  } catch (error) {
    return { status: 500, error: "Internal Server Error" };
  }
};

export const updateTheme = async (projectId: string, theme: string) => {
  try {
    if (!projectId || !theme) {
      return { status: 400, error: "Invalid Request" };
    }

    const updateProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        themeName: theme,
      },
    });
    if (!updateProject) {
      return { status: 500, error: "Failed to Update Theme" };
    }
    return { status: 200, data: updateProject };
  } catch (error) {
    console.error("🛑 ️ Error in updateTheme:", error);
    return { status: 500, error: "Internal Server Error" };
  }
};
