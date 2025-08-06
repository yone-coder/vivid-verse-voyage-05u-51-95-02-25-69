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
            rightContent={
              <div className="text-xs text-gray-500 flex items-center">
                <Clock size={12} className="mr-1" />
                Limited time offer
              </div>
            }
          />
        )}

        {/* Bundle Cards - reduced height */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {visibleTiers.map((tier, index) => {
            const isSelected = getCurrentTier() === tier;
            const isPopular = tier.discount === 20; // Mark the 25 quantity tier as popular

            return (
                              <div
                key={index}
                className={`border-2 rounded-lg transition-all relative
                  ${isSelected
                    ? "border-red-500 bg-red-50 shadow-sm ring-2 ring-red-500/20"
                    : "border-red-200 hover:border-red-400 hover:shadow hover:scale-105"}
                  cursor-pointer transform transition-transform duration-150 ease-in-out hover:bg-red-50/10`}
                onClick={() => onQuantitySelect?.(tier.quantity)}
              >

                {/* Selection checkmark */}
                {isSelected && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-md z-20">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}

                {/* Quantity Display Area - Clean modern design */}
                <div className="relative h-20 w-full bg-white rounded-lg overflow-hidden flex items-center justify-center border border-gray-200 shadow-sm">
                  {/* Unit price label on top center - Clean gray */}
                  <div className="absolute top-0 left-0 right-0 bg-gray-800 text-white text-center py-1">
                    <div className="text-[10px] font-medium">
                      {htgPrices[tier.quantity] ? `${Math.round(htgPrices[tier.quantity]).toLocaleString()} HTG` : `$${tier.price.toFixed(2)}`} each
                    </div>
                  </div>

                  {/* Large quantity number - Clean dark */}
                  <div className="text-2xl font-semibold text-gray-900">
                    {tier.quantity}
                  </div>

                  {/* Total price label on bottom center - AliExpress red */}
                  <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-center py-1">
                    <div className="text-[10px] font-medium">
                      {htgTotals[tier.quantity] ? `${Math.round(htgTotals[tier.quantity]).toLocaleString()} HTG` : `$${(tier.price * tier.quantity).toFixed(2)}`}
                    </div>
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