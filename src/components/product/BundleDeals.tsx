import React, { useState, useEffect } from 'react';
import { Package, Clock, Check } from 'lucide-react';
import { cn } from "@/lib/utils";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import ProductSectionHeader from './ProductSectionHeader';
import ToggleExpandButton from "@/components/product/ToggleExpandButton";
import { convertUsdToHtg } from '@/utils/currencyConverter';

// Price tiers configuration (removed 1 pc tier)
const PRICE_TIERS = [
  { quantity: 5, price: 9.00, discount: 10 },
  { quantity: 10, price: 8.50, discount: 15 },
  { quantity: 25, price: 8.00, discount: 20 },
  { quantity: 50, price: 7.50, discount: 25 },
  { quantity: 100, price: 7.00, discount: 30 }
];

interface BundleDealsProps {
  className?: string;
  currentQuantity?: number;
  onQuantitySelect?: (quantity: number) => void;
  hideHeader?: boolean;
}

const BundleDeals: React.FC<BundleDealsProps> = ({ 
  className = "",
  currentQuantity = 1,
  onQuantitySelect,
  hideHeader = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [htgTotals, setHtgTotals] = useState<{ [key: number]: number }>({});
  const [htgPrices, setHtgPrices] = useState<{ [key: number]: number }>({});

  // Convert USD prices to HTG on component mount
  useEffect(() => {
    const convertPrices = async () => {
      const totals: { [key: number]: number } = {};
      const prices: { [key: number]: number } = {};
      for (const tier of PRICE_TIERS) {
        const totalUsd = tier.price * tier.quantity;
        const totalHtg = await convertUsdToHtg(totalUsd);
        const priceHtg = await convertUsdToHtg(tier.price);
        totals[tier.quantity] = totalHtg;
        prices[tier.quantity] = priceHtg;
      }
      setHtgTotals(totals);
      setHtgPrices(prices);
    };
    convertPrices();
  }, []);

  // Find which tier the current quantity falls into
  const getCurrentTier = () => {
    return PRICE_TIERS.find(tier => 
      currentQuantity === tier.quantity
    );
  };

  const visibleTiers = isExpanded ? PRICE_TIERS : PRICE_TIERS.slice(0, 3);
  const maxDiscount = Math.max(...PRICE_TIERS.map(tier => tier.discount));

  return (
    <div className={`w-full ${className}`}>
      <div className="text-xs">
        {!hideHeader && (
          <ProductSectionHeader
            title="Bundle Deals"
            icon={Package}
            leftExtra={
              <div className="bg-orange-100 text-orange-600 text-xs px-1.5 py-0.5 rounded-full font-medium">
                Save up to {maxDiscount}%
              </div>
            }
            rightContent={
              <div className="text-xs text-gray-500 flex items-center">
                <Clock size={12} className="mr-1" />
                Limited time offer
              </div>
            }
          />
        )}

        {/* Bundle Cards - matching color variants layout exactly */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {visibleTiers.map((tier, index) => {
            const isSelected = getCurrentTier() === tier;
            const isPopular = tier.discount === 20; // Mark the 25 quantity tier as popular

            return (
              <div
                key={index}
                className={`border rounded-lg transition-all relative
                  ${isSelected
                    ? "border-[#FF4747] bg-red-50/30 shadow-sm ring-2 ring-[#FF4747]/20"
                    : "border-gray-200 hover:border-red-200 hover:shadow hover:scale-[1.02]"}
                  cursor-pointer transform transition-transform duration-150 ease-in-out hover:bg-red-50/10`}
                onClick={() => onQuantitySelect?.(tier.quantity)}
              >
                {/* Discount badge - top left */}
                {tier.discount > 0 && (
                  <div className="absolute top-1 left-1 bg-red-500 text-white rounded-full min-w-[18px] h-[18px] flex items-center justify-center z-10">
                    <span className="text-[9px] font-medium px-1">
                      -{tier.discount}%
                    </span>
                  </div>
                )}

                {/* Popular badge */}
                {isPopular && (
                  <span className="absolute top-1 left-1 bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded z-10">
                    POPULAR
                  </span>
                )}

                {/* Selection checkmark */}
                {isSelected && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-[#FF4747] rounded-full flex items-center justify-center shadow-md z-20">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}

                {/* Quantity Display Area (instead of image) */}
                <div className="relative aspect-square w-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-md overflow-hidden flex items-center justify-center">
                  {/* Large quantity number */}
                  <div className="text-3xl font-bold text-gray-700">
                    {tier.quantity}
                  </div>
                  
                  {/* Small "pcs" label */}
                  <div className="absolute bottom-2 right-2 text-xs text-gray-500 font-medium">
                    pcs
                  </div>
                  
                  {/* Price label on bottom center - matching color variants */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center py-1">
                    <div className="text-xs font-semibold">
                      {htgPrices[tier.quantity] ? `${Math.round(htgPrices[tier.quantity]).toLocaleString()} HTG` : `$${tier.price.toFixed(2)}`} each
                    </div>
                  </div>
                </div>
                
                {/* Total price below (replacing variant name) */}
                <div className="p-2 text-center">
                  <div className="text-xs text-gray-600">
                    Total: {htgTotals[tier.quantity] ? `${Math.round(htgTotals[tier.quantity]).toLocaleString()} HTG` : `$${(tier.price * tier.quantity).toFixed(2)}`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Toggle button */}
        <div className="text-center mt-1">
          <ToggleExpandButton
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
          />
        </div>
      </div>
    </div>
  );
};

export default BundleDeals;