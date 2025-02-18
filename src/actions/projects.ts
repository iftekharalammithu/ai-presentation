"use server";

import { client } from "@/lib/prisma";
import { onAuthenticateUser } from "./user";

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
