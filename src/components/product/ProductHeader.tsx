
import React, { useState } from "react";
import { Heart, Share } from "lucide-react";
import { useScrollProgress } from "./header/useScrollProgress";
import LiveBadge from "./header/LiveBadge";
import BackButton from "./header/BackButton";
import HeaderActionButton from "./header/HeaderActionButton";
import AliExpressSearchBar from "@/components/shared/AliExpressSearchBar";
import { useParams } from 'react-router-dom';
import { useProduct } from '@/hooks/useProduct';

interface ProductHeaderProps {
  activeSection?: string;
  onTabChange?: (section: string) => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ 
  activeSection = "overview", 
  onTabChange 
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { progress } = useScrollProgress();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { id: paramId } = useParams<{ id: string }>();
  const { data: product } = useProduct(paramId || '');

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  return (
    <div 
      className="fixed top-0 left-0 right-0 z-30 flex flex-col transition-all duration-700"
    >
      {/* Main Header */}
      <div 
        className="py-2 px-3 w-full transition-all duration-700"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${progress * 0.95})`,
          backdropFilter: `blur(${progress * 8}px)`,
        }}
      >
        <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
          {/* Left side - Back button and Live badge */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <BackButton progress={progress} />
            {progress < 0.5 && <LiveBadge progress={progress} />}
          </div>

          {/* Center - Search bar when scrolled */}
          <div className="flex-1 mx-4">
            {progress >= 0.5 && (
              <AliExpressSearchBar 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery}
                placeholder="Search products..."
              />
            )}
          </div>

          {/* Right side - Action buttons */}
          <div className="flex gap-2 flex-shrink-0">
            <HeaderActionButton 
              Icon={Heart} 
              active={isFavorite} 
              onClick={toggleFavorite} 
              progress={progress} 
              activeColor="#f43f5e"
            />

            <HeaderActionButton 
              Icon={Share} 
              progress={progress} 
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductHeader;
