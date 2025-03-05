"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutSlides, Slide } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { v4 } from "uuid";
import { MasterRecursiveComponent } from "./MasterRecursiveComponent";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Trash } from "lucide-react";
import { updateSlides } from "@/actions/projects";

interface DropZoneProps {
  index: number;
  onDrop: (
    item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index: number;
    },
    dropIndex: number
  ) => void;
  isEditable: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({
  index,
  onDrop,
  isEditable,
}) => {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: ["SLIDE", "layout"],
    drop: (item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index: number;
    }) => {
      onDrop(item, index);
    },
    canDrop: () => isEditable,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  if (!isEditable) {
    return null;
  }
  return (
    <div
      ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
      className={cn(
        "h-4 my-2 rounded-md transition-all duration-200",
        isOver && canDrop ? "border-green-500 bg-green-100" : "border-gray-300",
        canDrop ? "border-blue-300" : ""
      )}
    >
      {isOver && canDrop && (
        <div className=" h-full flex items-center justify-center text-green-600">
          Drop Here
        </div>
      )}
    </div>
  );
};

interface DraggableSlide {
  slide: Slide;
  index: number;
  moveSlide: (dragIndex: number, hoverIndex: number) => void;
  handleDelete: (id: string) => void;
  isEditable: boolean;
}

export const DraggableSlide: React.FC<DraggableSlide> = ({
  slide,
  index,
  moveSlide,
  handleDelete,
  isEditable,
}) => {
  const ref = useRef(null);

  const { currentSlide, setCurrentSlide, currentTheme, updateContentItem } =
    useSlideStore();

  const [{ isDragging }, drag] = useDrag({
    type: "SLIDE",
    item: {
      index,
      type: "SLIDE",
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isEditable,
  });

  const [, drop] = useDrop({
    accept: [" SLIDE", "LAYOUT"],
    hover(item: { index: number; type: string }) {
      if (!ref.current || !isEditable) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (item.type === "SLIDE") {
        if (dragIndex === hoverIndex) {
          return;
        }
        moveSlide(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });
  drag(drop(ref));

  const handleContentChange = (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => {
    if (isEditable) {
      updateContentItem(slide.id, contentId, newContent);
    }
  };
  return (
    <div
      ref={ref}
      className={cn(
        " w-full rounded-lg shadow-lg relative p-0 min-h-[400px] max-h-[800px] ",
        " shadow-xl transition-shadow duration-300",
        " flex flex-col",
        index === currentSlide ? " ring-2 ring-blue-500 ring-offset-2" : "",
        slide.className,
        isDragging ? "opacity-50" : "opacity-100"
      )}
      style={{
        backgroundColor: currentTheme.gradientBackground,
      }}
      onClick={() => setCurrentSlide(index)}
    >
      <div className=" h-full w-full flex-grow overflow-hidden">
        <MasterRecursiveComponent
          content={slide.content}
          isPreview={false}
          SlideId={slide.id}
          isEditable={isEditable}
          onContentChage={handleContentChange}
          index={index}
        ></MasterRecursiveComponent>
      </div>
      {isEditable && (
        <Popover>
          <PopoverTrigger asChild className=" absolute top-2 left-2">
            <Button size="sm" variant={"outline"}>
              <EllipsisVertical className=" w-5 h-5">
                <span className=" sr-only">Slide Options</span>
              </EllipsisVertical>
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" w-fit p-0">
            <div className=" flex space-x-2">
              <Button variant={"ghost"} onClick={() => handleDelete(slide.id)}>
                <Trash className=" w-5 h-5 text-red-500"></Trash>
                <span className=" sr-only">Delete Slide</span>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

type Props = {
  isEditable: boolean;
};

const Editor = ({ isEditable }: Props) => {
  const {
    getOrderSlides,
    reorderSlides,
    slides,
    project,
    currentSlide,
    removeSlide,
    addSlideAtIndex,
  } = useSlideStore();

  const orderSlides = getOrderSlides();
  const autosaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [loading, setloading] = useState(true);
  const slideRefs = useRef<HTMLDivElement[]>([]);

  const moveSlide = (dragIndex: number, hoverIndex: number) => {
    if (isEditable) {
      reorderSlides(dragIndex, hoverIndex);
    }
  };

  const handleDrop = (
    item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index: number;
    },
    dropIndex: number
  ) => {
    if (!isEditable) {
      return;
    }
    if (item.type === "layout") {
      addSlideAtIndex(
        { ...item.component, id: v4(), slideOrder: dropIndex },
        dropIndex
      );
    } else if (item.type === "SLIDE" && item.index !== undefined) {
      moveSlide(item.index, dropIndex);
    }
  };

  const handleDelete = (id: string) => {
    if (!isEditable) {
      removeSlide(id);
    }
  };

  useEffect(() => {
    if (slideRefs.current[currentSlide]) {
      slideRefs.current[currentSlide]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentSlide]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setloading(false);
    }
  }, []);

  const saveSLides = useCallback(() => {
    if (isEditable && project) {
      (async () => {
        await updateSlides(project.id, JSON.parse(JSON.stringify(slides)));
      })();
    }
  }, [isEditable, project, slides]);

  useEffect(() => {
    if (autosaveTimeoutRef.current) {
      clearTimeout(autosaveTimeoutRef.current);
    }
    if (isEditable) {
      autosaveTimeoutRef.current = setTimeout(() => {
        saveSLides();
      }, 2000);
    }
    return () => {
      if (autosaveTimeoutRef.current) {
        clearTimeout(autosaveTimeoutRef.current);
      }
    };
  }, [slides, isEditable, project]);

  return (
    <div className=" flex-1 flex-col h-full max-w-3xl mx-auto px-4 mb-20">
      {loading ? (
        <div className=" w-full px-4 flex flex-col space-y-6">
          <Skeleton className=" h-52 w-full"></Skeleton>
          <Skeleton className=" h-52 w-full"></Skeleton>
          <Skeleton className=" h-52 w-full"></Skeleton>
        </div>
      ) : (
        <ScrollArea className=" flex-1 mt-8">
          <div className=" px-4 pb-4 space-y-4 pt-2">
            {isEditable && (
              <DropZone
                index={0}
                onDrop={handleDrop}
                isEditable={isEditable}
              ></DropZone>
            )}
            {orderSlides.map((slide, index) => (
              <React.Fragment key={index}>
                <DraggableSlide
                  slide={slide}
                  index={index}
                  moveSlide={moveSlide}
                  handleDelete={handleDelete}
                  isEditable={isEditable}
                ></DraggableSlide>
                {isEditable && (
                  <DropZone
                    index={index + 1}
                    onDrop={handleDrop}
                    isEditable={isEditable}
                  ></DropZone>
                )}
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default Editor;
