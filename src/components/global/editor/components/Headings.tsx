"use client";

import React, { useEffect, useRef, ForwardedRef } from "react";

interface HeadingProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  style?: React.CSSProperties;
  isPreview: boolean;
}

const createHeading = (displayName: string, defaultClassName: string) => {
  const Heading = React.forwardRef<HTMLTextAreaElement, HeadingProps>(
    ({ children, style, className, isPreview = false, ...prop }, ref) => {
      const textareaRef = useRef<HTMLTextAreaElement>(null);
      useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea && !isPreview) {
          const adjustHeight = () => {
            textarea.style.height = "0";
            textarea.style.height = `${textarea.scrollHeight}px`;
          };

          textarea.addEventListener("input", adjustHeight);
          adjustHeight();
          return () => textarea.removeEventListener("input", adjustHeight);
        }
      }, [isPreview]);
      const previewClassName = isPreview ? "text-xs" : "";
      return (
        <textarea
          className={cn(
            `w-full bg-transparent ${defaultClassName} ${previewClassName} font-normal text-gray-900 placeholder:text-gray-300 focus:outline-none resize-none overflow-hidden leading-tight`,
            className
          )}
          style={{
            padding: 0,
            margin: 0,
            color: "inherit",
            boxSizing: "content-box",
            lineHeight: "1.2em",
            minHeight: "1.2em",
            ...style,
          }}
          ref={(el) => {
            textareaRef.current = el;
            if (typeof ref === "function") {
              ref(el);
            } else if (ref) {
              ref.current = el;
            }
          }}
          readOnly={isPreview}
          {...prop}
        />
      );
    }
  );
  Heading.displayName = displayName; // Set display name for debugging
  return Heading;
};

const Heading1 = createHeading("Heading1", "text-4xl");
const Heading2 = createHeading("Heading2", "text-3xl");
const Heading3 = createHeading("Heading3", "text-2xl");
const Heading4 = createHeading("Heading4", "text-xl");
const Title = createHeading("Title", "text-5xl");

export { Heading1, Heading2, Heading3, Heading4, Title };
