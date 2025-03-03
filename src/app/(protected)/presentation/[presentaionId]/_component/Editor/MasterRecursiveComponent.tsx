import { ContentItem } from "@/lib/types";
import React, { useCallback } from "react";
import { animate, motion } from "framer-motion";
import { Heading1 } from "@/components/global/editor/components/Headings";
import { cn } from "@/lib/utils";

type MasterRecursiveComponentProps = {
  content: ContentItem;
  onContentChage: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  isPreview: boolean;
  isEditable: boolean;
  SlideId: string;
  index: number;
};

const ContentRenderer: React.FC<MasterRecursiveComponentProps> = React.memo(
  ({ content, onContentChage, isPreview, isEditable, SlideId, index }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onContentChage(content.id, e.target.value);
      },
      [content.id, onContentChage]
    );
    const commonProps = {
      placeholder: content.placeholder,
      value: content.content as string,
      onChange: handleChange,
      isPreview: isPreview,
    };

    const animationProps = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    };

    switch (content.type) {
      case "heading1":
        return (
          <motion.div className="w-full h-full">
            <Heading1 {...commonProps}></Heading1>
          </motion.div>
        );
      case "column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div
              {...animationProps}
              className={cn(" w-full h-full flex flex-col", content.className)}
            >
              {content.content.length > 0
                ? (content.content as ContentItem[]).map(
                    (subItem: ContentItem, subIndex: number) => (
                      <React.Fragment key={subItem.id || `iten-${subIndex}`}>
                        {!isPreview &&
                          !subItem.restrictToDrop &&
                          subIndex === 0 &&
                          isEditable && <DropZone></DropZone>}
                      </React.Fragment>
                    )
                  )
                : ""}
            </motion.div>
          );
        }
        return null;

      default:
        return <h1>Noting</h1>;
        break;
    }
  }
);

// Add a display name for the component

export default ContentRenderer;

ContentRenderer.displayName = "ContentRenderer";

export const MasterRecursiveComponent: React.FC<MasterRecursiveComponentProps> =
  React.memo(
    ({
      content,
      onContentChage,
      isPreview = false,
      isEditable = true,
      SlideId,
      index,
    }) => {
      if (isPreview) {
        return (
          <ContentRenderer
            content={content}
            onContentChage={onContentChage}
            isPreview={isPreview}
            isEditable={isEditable}
            SlideId={SlideId}
            index={index}
          />
        );
      }
      return (
        <React.Fragment>
          <ContentRenderer
            content={content}
            onContentChage={onContentChage}
            isPreview={isPreview}
            isEditable={isEditable}
            SlideId={SlideId}
            index={index}
          ></ContentRenderer>
        </React.Fragment>
      );
    }
  );

MasterRecursiveComponent.displayName = "MasterRecursiveComponent";
