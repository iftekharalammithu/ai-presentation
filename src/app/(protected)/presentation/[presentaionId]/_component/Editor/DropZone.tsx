import { useSlideStore } from "@/store/useSlideStore";
import React from "react";

type DropZoneProps = {
  index: number;
  parentId: string;
  slideId: string;
};

const DropZone = ({ index, parentId, slideId }: DropZoneProps) => {
  const { addComponentInSlide } = useSlideStore();
  return <div></div>;
};

export default DropZone;
