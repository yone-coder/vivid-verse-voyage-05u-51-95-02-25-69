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

        {/* Bundle Cards */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {visibleTiers.map((tier, index) => {
            const isSelected = getCurrentTier() === tier;
            const isPopular = tier.discount === 20; // Mark the 25 quantity tier as popular

            return (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      className={cn(
                        "relative flex flex-col items-center p-2 rounded-md transition-all duration-200",
                        isSelected 
                          ? 'ring-2 ring-blue-500 bg-blue-50' 
                          : 'hover:bg-gray-100 bg-gray-50 border border-gray-200'
                      )}
                      onClick={() => onQuantitySelect?.(tier.quantity)}
                      aria-label={`Select bundle: ${tier.quantity} pieces`}
                    >
                      {/* Quantity Circle */}
                      <div className="relative w-10 h-10 rounded-full border border-gray-200 mb-1 flex items-center justify-center bg-white">
                        <span className="text-sm font-bold text-gray-700">
                          {tier.quantity}
                        </span>
                        
                        {tier.discount > 0 && (
                          <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full min-w-[16px] h-4 flex items-center justify-center">
                            <span className="text-[7px] font-medium px-1">
                              -{tier.discount}%
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Price */}
                      <span className="text-[10px] text-blue-600 font-medium">
                        {htgPrices[tier.quantity] ? `${Math.round(htgPrices[tier.quantity]).toLocaleString()} HTG` : `$${tier.price.toFixed(2)}`} each
                      </span>
                      
                      {/* Quantity Label */}
                      <span className="text-[10px] text-gray-600">
                        {tier.quantity} pcs
                      </span>
                      
                      {/* Popular Badge */}
                      {isPopular && (
                        <Badge 
                          className="absolute -top-1 -left-1 text-[7px] py-0 px-1 bg-amber-400 hover:bg-amber-400"
                        >
                          POPULAR
                        </Badge>
                      )}
                      
                      {/* Selection Check */}
                      {isSelected && (
                        <Check 
                          className="absolute top-0 right-0 w-4 h-4 text-blue-500 bg-white rounded-full p-0.5 shadow-sm" 
                        />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-xs p-2">
                    <p className="font-medium">{tier.quantity} pieces</p>
                    <p className="text-blue-600">
                      {htgPrices[tier.quantity] ? `${Math.round(htgPrices[tier.quantity]).toLocaleString()} HTG` : `$${tier.price.toFixed(2)}`} each
                    </p>
                    <p className="text-green-600">
                      Total: {htgTotals[tier.quantity] ? `${Math.round(htgTotals[tier.quantity]).toLocaleString()} HTG` : `$${(tier.price * tier.quantity).toFixed(2)}`}
                    </p>
                    {tier.discount > 0 && <p className="text-red-600">{tier.discount}% discount</p>}
                    {isPopular && <p className="text-amber-600">Most popular choice</p>}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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