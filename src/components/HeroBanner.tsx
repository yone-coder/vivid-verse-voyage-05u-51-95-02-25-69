
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import HeroSlide from "./hero/HeroSlide";
import HeroIndicators from "./hero/HeroIndicators";
import HeroControls from "./hero/HeroControls";
import { useQuery } from "@tanstack/react-query";
import { fetchHeroBanners } from "@/integrations/supabase/hero";
import { setupStorageBuckets } from "@/integrations/supabase/setupStorage";

const HeroBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  
  // Initialize storage buckets if needed
  useEffect(() => {
    setupStorageBuckets();
  }, []);
  
  const { data: banners, isLoading } = useQuery({
    queryKey: ["hero-banners"],
    queryFn: fetchHeroBanners,
    staleTime: 60000, // 1 minute
  });

  // Fallback banners in case database is empty
  const fallbackBanners = [
    {
      id: "1",
      image: "/lovable-uploads/2102d3a1-ec6e-4c76-8ee0-549c3ae3d54e.png",
      alt: "Banner 1",
      position: 0
    },
    {
      id: "2",
      image: "/lovable-uploads/4dbaee7c-2ac5-4a1b-9f9b-121275273e79.png",
      alt: "Banner 2",
      position: 1
    },
    {
      id: "3",
      image: "/lovable-uploads/dd1cad7b-c3b6-43a6-9bc6-deb38a120604.png",
      alt: "Banner 3",
      position: 2
    }
  ];

  // Use banners from database or fallback banners
  const slidesToShow = banners?.length > 0 ? banners : fallbackBanners;

  const handleNext = useCallback(() => {
    setActiveIndex((current) => (current === slidesToShow.length - 1 ? 0 : current + 1));
  }, [slidesToShow.length]);

  const handlePrevious = useCallback(() => {
    setActiveIndex((current) => (current === 0 ? slidesToShow.length - 1 : current - 1));
  }, [slidesToShow.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleNext]);

  if (isLoading) {
    return (
      <div className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-gray-400">Loading banners...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
      {slidesToShow.map((slide, index) => (
        <HeroSlide
          key={slide.id}
          image={slide.image}
          alt={slide.alt}
          isActive={activeIndex === index}
        />
      ))}

      <HeroControls 
        onPrevious={handlePrevious} 
        onNext={handleNext} 
      />

      <HeroIndicators 
        slides={slidesToShow} 
        activeIndex={activeIndex} 
        setActiveIndex={setActiveIndex} 
      />
    </div>
  );
};

export default HeroBanner;
