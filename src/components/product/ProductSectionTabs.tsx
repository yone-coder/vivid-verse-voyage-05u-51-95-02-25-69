import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductSectionTabsProps {
  onTabChange: (section: string) => void;
  activeSection: string;
}

const ProductSectionTabs: React.FC<ProductSectionTabsProps> = ({
  onTabChange,
  activeSection
}) => {
  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-2">
      <Tabs value={activeSection} onValueChange={onTabChange}>
        <TabsList className="grid w-full grid-cols-3 bg-gray-50">
          <TabsTrigger 
            value="overview" 
            className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-primary"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="description" 
            className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-primary"
          >
            Description
          </TabsTrigger>
          <TabsTrigger 
            value="reviews" 
            className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-primary"
          >
            Reviews
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ProductSectionTabs;