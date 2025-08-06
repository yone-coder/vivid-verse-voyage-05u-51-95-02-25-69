import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Check, Users, Store } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SellerInfoProps {
  seller?: {
    id: string;
    name: string;
    description?: string;
    image_url?: string;
    verified: boolean;
    rating?: number;
    total_sales: number;
    followers_count: number;
    trust_score: number;
  };
}

const SellerInfo: React.FC<SellerInfoProps> = ({ seller }) => {
  const navigate = useNavigate();

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

  const getTrustLevel = (score: number): { level: string; color: string } => {
    if (score >= 90) return { level: "Excellent", color: "text-green-600" };
    if (score >= 80) return { level: "Very Good", color: "text-blue-600" };
    if (score >= 70) return { level: "Good", color: "text-yellow-600" };
    return { level: "Fair", color: "text-orange-600" };
  };

  const trustInfo = getTrustLevel(seller.trust_score);

  // Get the seller logo URL from Supabase storage 
  const getSellerLogoUrl = (imagePath?: string): string | null => {
    if (!imagePath) return null;

    const { data } = supabase.storage
      .from('seller-logos')
      .getPublicUrl(imagePath);

    return data.publicUrl;
  };

  const logoUrl = getSellerLogoUrl(seller.image_url);

  const handleViewStore = () => {
    navigate(`/seller/${seller.id}`);
  };

  return (
    <div className="bg-white">
      <div className="flex items-start gap-3">
        {/* Seller Avatar */}
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={seller.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Store className="w-6 h-6 text-gray-400" />
          )}
        </div>

        {/* Seller Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-gray-900 truncate">{seller.name}</h3>
            {seller.verified && (
              <Badge variant="secondary" className="p-1">
                <Check className="w-3 h-3" />
              </Badge>
            )}
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            {/* Rating */}
            {seller.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{seller.rating.toFixed(1)}</span>
              </div>
            )}

            {/* Sales */}
            <div className="flex items-center gap-1">
              <span>{formatNumber(seller.total_sales)} sales</span>
            </div>

            {/* Followers */}
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{formatNumber(seller.followers_count)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={handleViewStore}
            >
              View Store
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Follow
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;