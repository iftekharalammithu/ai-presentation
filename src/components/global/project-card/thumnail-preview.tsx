import { Slide, Theme } from "@/lib/types";
import React from "react";

interface ThumnailPreviewProps {
  slide: Slide;
  theme: Theme;
}

const ThumnailPreview = ({ slide, theme }: ThumnailPreviewProps) => {
  return (
    <div
      style={{
        fontFamily: theme.fontFamily,
        color: theme.accentColor,
        backgroundColor: theme.slideBackgroundColor,
        backgroundImage: theme.gradientBackground,
      }}
      className={cn(
        " w-full relative aspect-[16/9] rounded-lg overflow-hidden transition-all duration-200 p-2"
      )}
    >
      {slide ? (
        <div className=" scale-[0.5] origin-top-left w-[200%] h-[200%] overflow-hidden"></div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ThumnailPreview;
