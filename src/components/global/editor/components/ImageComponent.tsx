import Image from "next/image";
import React from "react";
import UploadImage from "./UploadImage";

type Props = {
  src: string;
  alt: string;
  className: string;
  isPreview: boolean;
  contentId: string;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  isEditable: boolean;
};

const ImageComponent = ({
  src,
  alt,
  className,
  isPreview,
  contentId,
  onContentChange,
  isEditable,
}: Props) => {
  return (
    <div className={`relative group w-full h-full rounded-lg`}>
      <Image
        src={src}
        alt={alt}
        width={isPreview ? 48 : 800}
        height={isPreview ? 48 : 800}
        className={`object-cover w-full h-full rounded-lg ${className}`}
      ></Image>
      {!isPreview && isEditable && (
        <div className="absolute top-0 left-0  group-hover:block">
          <UploadImage
            contentId={contentId}
            onContentChange={onContentChange}
          />
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
