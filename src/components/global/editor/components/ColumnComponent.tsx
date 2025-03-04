"use client";
import { MasterRecursiveComponent } from "@/app/(protected)/presentation/[presentaionId]/_component/Editor/MasterRecursiveComponent";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
type Props = {
  content: ContentItem[];
  className?: string;
  isPreview: boolean;
  slideId: string;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  isEditable: boolean;
};

const ColumnComponent = ({
  content,
  className,
  isPreview,
  slideId,
  onContentChange,
  isEditable,
}: Props) => {
  const [columns, setcolumns] = useState<ContentItem[]>([]);

  const createDefaultColumns = (count: number) => {
    return Array(count)
      .fill(null)
      .map(() => ({
        id: v4(),
        content: "",
        type: "paragraph" as const,
        name: "paragraph",
        placeholder: "start Typing...",
      }));
  };
  useEffect(() => {
    if (content.length === 0) {
      setcolumns(createDefaultColumns(2));
    } else {
      setcolumns(content);
    }
  }, [content]);

  return (
    <div className=" relative w-full h-full">
      <ResizablePanelGroup
        direction="horizontal"
        className={cn(
          "h-full w-full flex",
          !isEditable && "!border-0",
          className
        )}
      >
        {columns.map((item, index) => (
          <React.Fragment key={index}>
            <ResizablePanel minSize={20} defaultSize={100 / columns.length}>
              <div className={cn("h-full w-full", item.className)}>
                <MasterRecursiveComponent
                  content={item}
                  isPreview={isPreview}
                  SlideId={slideId}
                  onContentChage={onContentChange}
                  isEditable={isEditable}
                  index={index}
                ></MasterRecursiveComponent>
              </div>
            </ResizablePanel>
            {index < columns.length - 1 && isEditable && (
              <ResizableHandle withHandle={!isPreview}></ResizableHandle>
            )}
          </React.Fragment>
        ))}
      </ResizablePanelGroup>
    </div>
  );
};

export default ColumnComponent;
