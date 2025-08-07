// SellerInfo.tsx
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Star, Check, Users, Store, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import VerificationBadge from "@/components/shared/VerificationBadge";

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
      <div className="flex items-center gap-1">
        {/* Content - more compact */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500">Sold by</span>
          <h3 className="text-xs font-medium text-gray-900 truncate" style={{ maxWidth: '20ch' }}>
            {seller.name}
          </h3>
          {seller.verified && <VerificationBadge />}
        </div>

        {/* Avatar and Chevron - grouped together with no gap */}
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt={seller.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Store className="w-3 h-3 text-gray-400" />
            )}
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 ml-0.5" />
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;