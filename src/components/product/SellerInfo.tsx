// SellerInfo.tsx
import React, { useState } from "react";
import { Store, ShoppingBag, Users, Bell, BellOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import VerificationBadge from "@/components/shared/VerificationBadge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Free open-source placeholder image URLs
const FALLBACK_SELLER_LOGO = "https://picsum.photos/100/100?random=1";
const FALLBACK_BUYER_AVATAR = "https://i.pravatar.cc/100?img=3";

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
  productId?: string;
}

const SellerInfo: React.FC<SellerInfoProps> = ({ 
  seller, 
  stock = 0, 
  reservedStock = 0, 
  lastBuyerAvatar, 
  lastPurchase = "recently",
  productId
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!seller) {
    return null;
  }

  const handleStockNotification = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to subscribe to stock notifications
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setIsSubscribed(!isSubscribed);
      toast.success(
        isSubscribed 
          ? "You'll no longer receive stock notifications" 
          : "You'll be notified when stock is available!"
      );
    } catch (error) {
      toast.error("Failed to update notification preference");
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
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
    if (target.alt.includes("seller")) {
      target.src = FALLBACK_SELLER_LOGO;
    } else {
      target.src = FALLBACK_BUYER_AVATAR;
    }
    target.onerror = null;
  };

  return (
    <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
      {/* Seller Info Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Sold by</span>
          
          {/* Seller Avatar */}
          <div className="w-6 h-6 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
            <img 
              src={logoUrl || FALLBACK_SELLER_LOGO}
              alt={`${seller.name} seller`}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
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
        <div className="flex items-center gap-1">
          <StockIndicator stock={stock} />
          <span className="text-gray-300 mx-1">|</span>
          <span className="text-gray-600">{availableStock} available</span>
          
          {/* Stock Notification Bell */}
          {stock <= 0 && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-4 h-4 ml-1 text-gray-400 hover:text-primary"
              onClick={handleStockNotification}
              disabled={isLoading}
            >
              {isSubscribed ? (
                <BellOff className="w-3 h-3" />
              ) : (
                <Bell className="w-3 h-3" />
              )}
            </Button>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          {/* Buyer Avatar */}
          <div className="w-4 h-4 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
            <img 
              src={lastBuyerAvatar || FALLBACK_BUYER_AVATAR}
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