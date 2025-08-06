
import React from "react";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  progress: number;
}

const BackButton = ({ progress }: BackButtonProps) => (
  <div className="rounded-full transition-all duration-700"
    style={{ backgroundColor: `rgba(0, 0, 0, ${0.1 * (1 - progress)})` }}>
    <button className="h-7 w-7 rounded-full flex items-center justify-center transition-all duration-700"
      style={{
        backgroundColor: 'transparent'
      }}>
      <ChevronLeft
        className="transition-all duration-700"
        style={{
          color: progress > 0.5 ? `rgba(75, 85, 99, ${0.7 + (progress * 0.3)})` : `rgba(255, 255, 255, ${0.9 - (progress * 0.2)})`
        }}
        strokeWidth={1.5}
        size={18}
      />
    </button>
  </div>
);

export default BackButton;
