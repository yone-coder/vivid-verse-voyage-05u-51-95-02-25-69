// SellerInfo.tsx
import React from "react";
import { Store, ShoppingBag, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import VerificationBadge from "@/components/shared/VerificationBadge";

// Fallback image (import or define)
const FALLBACK_AVATAR = "/images/default-avatar.png"; // Update with your fallback image path

interface SellerInfoProps {
  seller?: {
    id: string;
    name: string;
    image_url?: string;
    verified: boolean;
    rating?: number;
    total_sales: number;
    followers_count: number;
  };
  stock?: number;
  reservedStock?: number;
  lastBuyerAvatar?: string | null;
  lastPurchase?: string;
}

const SellerInfo: React.FC<SellerInfoProps> = ({ 
  seller, 
  stock = 0, 
  reservedStock = 0, 
  lastBuyerAvatar, 
  lastPurchase = "recently" 
}) => {
  if (!seller) {
    return null;
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatSales = (num: number): string => formatNumber(num);

  const getSellerLogoUrl = (imagePath?: string): string | null => {
    if (!imagePath) return null;
    const { data } = supabase.storage.from('seller-logos').getPublicUrl(imagePath);
    return data.publicUrl;
  };

  const StockIndicator = ({ stock }: { stock: number }) => {
    if (stock > 10) return <span className="text-green-600">In stock</span>;
    if (stock > 0) return <span className="text-yellow-600">Low stock</span>;
    return <span className="text-red-600">Out of stock</span>;
  };

  const logoUrl = getSellerLogoUrl(seller.image_url);
  const rating = seller.rating?.toFixed(1) || "0.0";
  const totalSales = seller.total_sales;
  const availableStock = Math.max(0, stock - reservedStock);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = FALLBACK_AVATAR;
    target.onerror = null; // Prevent infinite loop if fallback also fails
  };

  return (
    <div className="bg-white p-2 rounded-lg border border-gray-100">
      {/* Seller Info Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Sold by</span>
          
          {/* Seller Avatar with Fallback */}
          <div className="w-6 h-6 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
            {logoUrl ? (
              <img 
                src={logoUrl}
                alt={seller.name}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            ) : (
              <img
                src={FALLBACK_AVATAR}
                alt={seller.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <h3 className="text-xs font-medium text-gray-900 truncate max-w-[100px]">
              {seller.name}
            </h3>
            {seller.verified && <VerificationBadge size="xs" />}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 ml-1">
            <span className="text-gray-300">|</span>
            <span className="text-yellow-500 text-xs">★</span>
            <span className="text-xs text-gray-700">{rating}</span>
          </div>
        </div>

        {/* Sales Count */}
        <div className="flex items-center gap-1">
          <ShoppingBag className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-500">({formatSales(totalSales)})</span>
        </div>
      </div>

      {/* Stock Info Row */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center">
          <StockIndicator stock={stock} />
          <span className="text-gray-300 mx-1">|</span>
          <span className="text-gray-600">{availableStock} available</span>
        </div>
        
        <div className="flex items-center gap-1">
          {/* Buyer Avatar with Fallback */}
          <div className="w-4 h-4 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
            <img 
              src={lastBuyerAvatar || FALLBACK_AVATAR}
              alt="Last buyer"
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>
          <span className="text-gray-500">Last bought {lastPurchase}</span>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;