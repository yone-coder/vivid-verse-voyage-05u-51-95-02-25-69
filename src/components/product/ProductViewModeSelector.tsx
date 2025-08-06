
import React from "react";
import { Button } from "@/components/ui/button";
import { LineChart, BarChart, Gauge } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardWithDuration
} from "@/components/ui/hover-card";

export type ViewMode = "compact" | "modern" | "detailed";

interface ProductViewModeSelectorProps {
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
}

const ProductViewModeSelector: React.FC<ProductViewModeSelectorProps> = ({
  viewMode,
  onChangeViewMode
}) => {
  return (
    <HoverCardWithDuration openDelay={300} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div className="flex items-center border border-gray-200 rounded-md px-1 py-0.5">
          <Button
            variant="ghost"
            size="sm"
            className={`h-5 w-5 p-0 rounded-sm ${viewMode === "compact" ? "bg-blue-100 text-blue-600" : ""}`}
            onClick={() => onChangeViewMode("compact")}
          >
            <LineChart className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-5 w-5 p-0 rounded-sm ${viewMode === "modern" ? "bg-blue-100 text-blue-600" : ""}`}
            onClick={() => onChangeViewMode("modern")}
          >
            <BarChart className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-5 w-5 p-0 rounded-sm ${viewMode === "detailed" ? "bg-blue-100 text-blue-600" : ""}`}
            onClick={() => onChangeViewMode("detailed")}
          >
            <Gauge className="h-3 w-3" />
          </Button>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-48 p-2">
        <div className="text-xs font-medium mb-1">View Modes</div>
        <ul className="text-xs space-y-1">
          <li className="flex items-center justify-between">
            <span>Compact</span>
            <LineChart className="h-3 w-3" />
          </li>
          <li className="flex items-center justify-between">
            <span>Modern</span>
            <BarChart className="h-3 w-3" />
          </li>
          <li className="flex items-center justify-between">
            <span>Detailed</span>
            <Gauge className="h-3 w-3" />
          </li>
        </ul>
      </HoverCardContent>
    </HoverCardWithDuration>
  );
};

export default ProductViewModeSelector;
