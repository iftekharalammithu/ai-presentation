// "use client";
import { BookTemplate, Home, Settings, Trash } from "lucide-react";

export const data = {
  user: {
    name: "shdcnm",
    email: "sdfsdf@dfds.com",
    avatar: "./Designer.png",
  },
  NavMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Templates",
      url: "/templates",
      icon: BookTemplate,
    },
    {
      title: "Trash",
      url: "/trash",
      icon: Trash,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
};
