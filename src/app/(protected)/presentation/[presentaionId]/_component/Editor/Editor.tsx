import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutSlides, Slide } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React, { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { v4 } from "uuid";

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
  return <div></div>;
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

  useEffect(() => {
    if (slideRefs.current[currentSlide]) {
      slideRefs.current[currentSlide]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentSlide]);

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
                <DraggableSlide></DraggableSlide>
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default Editor;
