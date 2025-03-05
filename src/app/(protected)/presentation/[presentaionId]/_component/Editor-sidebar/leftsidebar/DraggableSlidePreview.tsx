import { Slide } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import ScalePreview from "./ScalePreview";

type Props = {
  slide: Slide;
  index: number;
  moveSlide: (dragIndex: number, hoverIndex: number) => void;
};

const DraggableSlidePreview = ({ slide, index, moveSlide }: Props) => {
  const { currentSlide, setCurrentSlide } = useSlideStore();
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "SLIDE",
    item: { index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: "SLIDE",
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverInder = index;
      if (dragIndex === hoverInder) {
        return;
      }
      moveSlide(dragIndex, hoverInder);
      item.index = hoverInder;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={cn(
        " relative cursor-pointer group",
        index === currentSlide ? "before:bg-blue-500" : "before:bg-transparent",
        isDragging ? "opacity-50" : "opacity-100"
      )}
      onClick={() => setCurrentSlide(index)}
    >
      <div className=" pl-2  mb-4 relative">
        <ScalePreview
          slide={slide}
          isActive={index === currentSlide}
          index={index}
        ></ScalePreview>
      </div>
    </div>
  );
};

export default DraggableSlidePreview;
