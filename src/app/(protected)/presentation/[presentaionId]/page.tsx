"use client";
import { getprojectById } from "@/actions/projects";
import { themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type Props = {};

const Page = (props: Props) => {
  const { setSlides, setProject, currentTheme, setCurrentTheme } =
    useSlideStore();

  const params = useParams();
  const { setTheme } = useTheme();
  const [Loading, setLoading] = useState(true);

  const getprojectid = async () => {
    try {
      const res = await getprojectById(params.presentationId as string);
      if (res.status !== 200 || !res.data) {
        toast.error("Error", {
          description: "Unable to fetch project",
        });
        redirect("/deshboard");
      }
      const findTheme = themes.find(
        (theme) => theme.name === res.data.themeName
      );
      setCurrentTheme(findTheme || themes[0]);
      setTheme(findTheme?.type === "dark" ? "dark" : "light");
      setProject(res.data);
      setSlides(JSON.parse(JSON.stringify(res.data.slides)));
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "Unable to fetch project",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getprojectid();
  }, []);

  if (Loading) {
    return (
      <div className=" flex items-center justify-center h-screen">
        <Loader2 className=" w-8 h-8 animate-spin text-primary"></Loader2>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      {/* Your other components go here */}
    </DndProvider>
  );
};

export default Page;
