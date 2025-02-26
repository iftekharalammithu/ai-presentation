"use client";
import { useSlideStore } from "@/store/useSlideStore";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAnimation } from "framer-motion";
import { Theme } from "@/lib/types";
import { Button } from "@/components/ui/button";

const Themepreview = () => {
  const router = useRouter();
  const params = useParams();
  const controls = useAnimation();

  const { currentTheme, setCurrentTheme, project } = useSlideStore();

  const [selectTheme, setSelectTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    if (project?.slides) {
      redirect(`/presentation/${params.presentationId}`);
    }
  }, [project]);

  useEffect(() => {
    controls.start("visible");
  }, [controls, selectTheme]);

  const leftCardContent = (
    <div className=" space-y-4">
      <div
        className=" rounded-xl p-6"
        style={{ backgroundColor: selectTheme.accentColor + "10" }}
      >
        <h3
          className=" text-xl font-semibold mb-4"
          style={{ color: selectTheme.accentColor }}
        >
          Quick Start Guide
        </h3>
        <ol className=" list-decimal list-inside space-y-2">
          <li>Choose a theme</li>
          <li>Customize colors and fonts</li>
          <li>Add your content</li>
          <li>Preview and Publish</li>
        </ol>
      </div>
      <Button
        className=" w-full h-12 text-lg font-medium"
        style={{
          backgroundColor: selectTheme.accentColor,
          color: selectTheme.accentColor,
        }}
      >
        Get Started
      </Button>
    </div>
  );

  const mainCardContent = (
    <div className=" space-y-6">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className=" rounded-xl p-6"
          style={{ backgroundColor: selectTheme.accentColor + "10" }}
        >
          <p style={{ color: selectTheme.accentColor }}>
            This is a smart layout: it acts as a text box
          </p>
        </div>
        <div
          className=" rounded-xl p-6"
          style={{ backgroundColor: selectTheme.accentColor + "10" }}
        >
          <p style={{ color: selectTheme.accentColor }}>
            You can get these by typing /smart
          </p>
        </div>
      </div>
      <div className=" flex flex-wrap gap-4">
        <Button
          className=" h-12 px-6 text-lg font-medium"
          style={{
            backgroundColor: selectTheme.accentColor,
            color: selectTheme.fontColor,
          }}
        >
          Primary Button
        </Button>
        <Button
          variant="outline"
          className=" h-12 px-6 text-lg font-medium"
          style={{
            borderColor: selectTheme.accentColor,
            color: selectTheme.fontColor,
          }}
        >
          Secondary Button
        </Button>
      </div>
    </div>
  );

  // const rightCardContent=()
  return <div></div>;
};

export default Themepreview;
