"use client";
import { ContentItem } from "@/lib/types";
import React, { useCallback } from "react";
import { animate, motion } from "framer-motion";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Title,
} from "@/components/global/editor/components/Headings";
import { cn } from "@/lib/utils";
import DropZone from "./DropZone";
import Paragraph from "@/components/global/editor/components/Paragraph";
import TableComponents from "@/components/global/editor/components/TableComponents";
import ColumnComponent from "@/components/global/editor/components/ColumnComponent";
import ImageComponent from "@/components/global/editor/components/ImageComponent";
import BlockQuote from "@/components/global/editor/components/BlockQuote";
import ListComponents, {
  BulletList,
  TodoList,
} from "@/components/global/editor/components/ListComponents";
import CalloutBox from "@/components/global/editor/components/CalloutBox";
import CodeBlock from "@/components/global/editor/components/CodeBlock";
import TableOfContents from "@/components/global/editor/components/TableOfContents";
import Divider from "@/components/global/editor/components/Divider";

type MasterRecursiveComponentProps = {
  content: ContentItem;
  onContentChage: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  isPreview: boolean;
  isEditable?: boolean;
  SlideId: string;
  index?: number;
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
          <motion.div {...animationProps} className="w-full h-full">
            <Heading1 {...commonProps}></Heading1>
          </motion.div>
        );
      case "heading2":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <Heading2 {...commonProps}></Heading2>
          </motion.div>
        );
      case "heading3":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <Heading3 {...commonProps}></Heading3>
          </motion.div>
        );
      case "heading4":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <Heading4 {...commonProps}></Heading4>
          </motion.div>
        );
      case "title":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <Title {...commonProps}></Title>
          </motion.div>
        );
      case "paragraph":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <Paragraph {...commonProps}></Paragraph>
          </motion.div>
        );
      case "table":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <TableComponents
              content={content.content as string[][]}
              onChange={(newContent) =>
                onContentChage(
                  content.id,
                  newContent !== null ? newContent : ""
                )
              }
              initialColSize={content.initialColumns}
              initialRowSize={content.intialRows}
              isPreview={isPreview}
              isEditable={isEditable}
            ></TableComponents>
          </motion.div>
        );
      case "resizable-column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div {...animationProps} className="w-full h-full">
              <ColumnComponent
                content={content.content as ContentItem[]}
                className={content.className}
                onContentChange={onContentChage}
                isPreview={isPreview}
                isEditable={isEditable}
                slideId={SlideId}
              ></ColumnComponent>
            </motion.div>
          );
        }
        return null;
      case "image":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <ImageComponent
              src={content.content as string}
              alt={content.alt || "image"}
              className={content.className}
              isPreview={isPreview}
              isEditable={isEditable}
              onContentChange={onContentChage}
              contentId={content.id}
            ></ImageComponent>
          </motion.div>
        );
      case "blockquote":
        return (
          <motion.div
            {...animationProps}
            className={cn(" w-full h-full flex flex-col", content.className)}
          >
            <BlockQuote>
              <Paragraph {...commonProps}></Paragraph>
            </BlockQuote>
          </motion.div>
        );
      case "numberdList":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <ListComponents
              items={content.content as string[]}
              onchange={(newItems) => onContentChage(content.id, newItems)}
              className={content.className}
            ></ListComponents>
          </motion.div>
        );
      case "bulletList":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <BulletList
              items={content.content as string[]}
              onchange={(newItems) => onContentChage(content.id, newItems)}
              className={content.className}
            ></BulletList>
          </motion.div>
        );

      case "todoList":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <TodoList
              items={content.content as string[]}
              onchange={(newItems) => onContentChage(content.id, newItems)}
              className={content.className}
            ></TodoList>
          </motion.div>
        );

      case "calloutBox":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <CalloutBox
              type={content.callOutType || "info"}
              className={content.className}
            >
              <Paragraph {...commonProps}></Paragraph>
            </CalloutBox>
          </motion.div>
        );
      case "codeBlock":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <CodeBlock
              code={content.code}
              language={content.language}
              onchange={() => {}}
              className={content.className}
            ></CodeBlock>
          </motion.div>
        );

      case "tableofContents":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <TableOfContents
              items={content.content as string[]}
              onItemClick={(id) => {
                console.log(`Navigate to section: ${id}`);
              }}
              className={content.className}
            ></TableOfContents>
          </motion.div>
        );

      case "divider":
        return (
          <motion.div {...animationProps} className="w-full h-full">
            <Divider className={content.className}></Divider>
          </motion.div>
        );

      case "column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div
              {...animationProps}
              className={cn(" w-full h-full flex flex-col", content.className)}
            >
              {content.content.length > 0 ? (
                (content.content as ContentItem[]).map(
                  (subItem: ContentItem, subIndex: number) => (
                    <React.Fragment key={subItem.id || `iten-${subIndex}`}>
                      {!isPreview &&
                        !subItem.restrictToDrop &&
                        subIndex === 0 &&
                        isEditable && (
                          <DropZone
                            index={0}
                            parentId={content.id}
                            slideId={SlideId}
                          ></DropZone>
                        )}
                      <MasterRecursiveComponent
                        content={subItem}
                        onContentChage={onContentChage}
                        isPreview={isPreview}
                        SlideId={SlideId}
                        isEditable={isEditable}
                        index={subIndex}
                      ></MasterRecursiveComponent>
                      {!isPreview && !subItem.restrictToDrop && (
                        <DropZone
                          index={subIndex + 1}
                          parentId={content.id}
                          slideId={SlideId}
                        ></DropZone>
                      )}
                    </React.Fragment>
                  )
                )
              ) : isEditable ? (
                <DropZone
                  index={0}
                  parentId={content.id}
                  slideId={SlideId}
                ></DropZone>
              ) : null}
            </motion.div>
          );
        }
        return null;

      default:
        return null;
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
