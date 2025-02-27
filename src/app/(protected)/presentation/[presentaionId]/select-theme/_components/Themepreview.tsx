"use client";
import { useSlideStore } from "@/store/useSlideStore";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAnimation } from "framer-motion";
import { Theme } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ThemeCard from "./ThemeCard";
import ThemePicker from "./ThemePicker";
import { themes } from "@/lib/constants";

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

  const rightCardContent = (
    <div className=" space-y-4">
      <div
        className=" rounded-xl p-6"
        style={{ backgroundColor: selectTheme.accentColor + "10" }}
      >
        <h3
          className=" text-xl font-semibold mb-4"
          style={{ color: selectTheme.accentColor }}
        >
          Theme Features
        </h3>
        <ul
          className=" list-disc list-inside space-y-2"
          style={{ color: selectTheme.accentColor }}
        >
          <li>Responsive Design</li>
          <li>Dark and light mode</li>
          <li>Custom color schemes</li>
          <li>Accessibility Optimized</li>
        </ul>
      </div>
      <Button
        variant="outline"
        className=" h-12 px-6 text-lg font-medium"
        style={{
          borderColor: selectTheme.accentColor,
          color: selectTheme.fontColor,
        }}
      >
        Explore Features
      </Button>
    </div>
  );
  const applyTheme = (theme: Theme) => {
    setSelectTheme(theme);
    setCurrentTheme(theme);
  };

  return (
    <div
      className=" h-screen w-full flex"
      style={{
        backgroundColor: selectTheme.backgroundColor,
        color: selectTheme.accentColor,
        fontFamily: selectTheme.fontFamily,
      }}
    >
      <div className=" flex-grow overflow-y-auto">
        <div className=" p-12 flex flex-col items-center min-h-screen">
          <Button
            variant="outline"
            className=" mb-12 self-start"
            style={{
              backgroundColor: selectTheme.accentColor + "10",
              color: selectTheme.accentColor,
              borderColor: selectTheme.accentColor + "20",
            }}
            onClick={() => {
              router.push("/create-page");
            }}
          >
            <ArrowLeft className=" mr-2 h-5 w-5"></ArrowLeft>
            Back
          </Button>
          <div className=" w-full flex justify-center items-center relative  flex-grow">
            <ThemeCard
              title="Quick Start"
              description="Get up and Running in no time"
              content={leftCardContent}
              variant="left"
              theme={selectTheme}
              controls={controls}
            ></ThemeCard>
            <ThemeCard
              title="Main Preview"
              description="Get up and Running in no time"
              content={mainCardContent}
              variant="left"
              theme={selectTheme}
              controls={controls}
            ></ThemeCard>
            <ThemeCard
              title="Theme Features"
              description="Get up and Running in no time"
              content={rightCardContent}
              variant="left"
              theme={selectTheme}
              controls={controls}
            ></ThemeCard>
          </div>
        </div>
      </div>
      <ThemePicker
        selectedTheme={selectTheme}
        themes={themes}
        onThemeSelect={applyTheme}
      ></ThemePicker>
    </div>
  );
};

export default Themepreview;
