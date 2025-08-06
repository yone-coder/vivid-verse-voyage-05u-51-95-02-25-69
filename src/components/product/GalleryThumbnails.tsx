import React from 'react';
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

interface GalleryThumbnailsProps {
  images: string[];
  currentIndex: number;
  onThumbnailClick: (index: number) => void;
  isPlaying?: boolean;
}

const GalleryThumbnails = ({
  images,
  currentIndex,
  onThumbnailClick,
  isPlaying = false
}: GalleryThumbnailsProps) => {
  return (
    <div className="flex items-center gap-1.5 px-1.5 pt-1.5 pb-1.5 overflow-x-auto w-full scrollbar-hide">
      {[...Array(Math.min(7, images.length))].map((_, index) => (
        <div
          key={index}
          className={cn(
            "relative overflow-hidden rounded-md border flex-shrink-0 transition-all",
            "w-14 h-14 cursor-pointer",
            currentIndex === index 
              ? "border-primary shadow-sm" 
              : "border-gray-300 hover:border-gray-400"
          )}
          onClick={() => onThumbnailClick(index)}
        >
          {index === 0 ? (
            <div className="relative w-full h-full">
              <img 
                src={images[0]} 
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className={cn(
                "absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300",
                isPlaying && "opacity-0"
              )}>
                <Play className="h-4 w-4 text-white" />
              </div>
            </div>
          ) : (
            <img 
              src={images[index]} 
              alt={`Thumbnail ${index}`} 
              className="w-full h-full object-cover"
            />
          )}

          <span className="absolute bottom-0.5 right-0.5 text-[9px] bg-black/40 text-white px-0.5 rounded">
            {index + 1}
          </span>
        </div>
      ))}
    </div>
  );
};

export default GalleryThumbnails;