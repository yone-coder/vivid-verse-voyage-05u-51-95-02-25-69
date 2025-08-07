import React from "react";
import { Badge } from "@/components/ui/badge";
import { Star, Check, Users, Store } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
}

const SellerInfo: React.FC<SellerInfoProps> = ({ seller }) => {
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

  // Get the seller logo URL from Supabase storage 
  const getSellerLogoUrl = (imagePath?: string): string | null => {
    if (!imagePath) return null;

    const { data } = supabase.storage
      .from('seller-logos')
      .getPublicUrl(imagePath);

    return data.publicUrl;
  };

  const logoUrl = getSellerLogoUrl(seller.image_url);

  return (
    <div className="bg-white">
      <div className="flex items-center gap-3">
        {/* Seller Avatar */}
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={seller.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Store className="w-4 h-4 text-gray-400" />
          )}
        </div>

        {/* Seller Details - Centered to image */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate" style={{maxWidth: '14ch'}}>
            {seller.name}
          </h3>
          <span className="text-sm text-gray-600 font-normal whitespace-nowrap">
            (
            {seller.rating && (
              <>
                <Star className="inline w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                {seller.rating.toFixed(1)}
                <span className="mx-1">•</span>
              </>
            )}
            <Users className="inline w-3 h-3 mr-1" />
            {formatNumber(seller.followers_count)}
            )
          </span>
          {seller.verified && (
            <Badge variant="secondary" className="p-1">
              <Check className="w-3 h-3" />
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;