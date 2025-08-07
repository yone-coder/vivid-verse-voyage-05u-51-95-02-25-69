import React, { useState } from 'react';
import { Package, Clock } from 'lucide-react';
import ProductSectionHeader from './ProductSectionHeader';
import ToggleExpandButton from "@/components/product/ToggleExpandButton";

// Price tiers configuration
const PRICE_TIERS = [
  { min: 1, max: 2, price: 10.00, discount: 0 },
  { min: 3, max: 5, price: 9.00, discount: 10 },
  { min: 6, max: 9, price: 8.50, discount: 15 },
  { min: 10, max: 49, price: 8.00, discount: 20 },
  { min: 50, max: 99, price: 7.50, discount: 25 },
  { min: 100, max: Infinity, price: 7.00, discount: 30 }
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

  // Find which tier the current quantity falls into
  const getCurrentTier = () => {
    return PRICE_TIERS.find(tier => 
      currentQuantity >= tier.min && currentQuantity <= tier.max
    );
  };

  const visibleTiers = isExpanded ? PRICE_TIERS : PRICE_TIERS.slice(0, 3);
  const maxDiscount = Math.max(...PRICE_TIERS.map(tier => tier.discount));

  return (
    <div className={`w-full ${className}`}>
      <div className="text-xs">
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

        {/* Tiers grid */}
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {visibleTiers.map((tier, index) => {
            const rangeLabel = tier.max === Infinity ? `${tier.min}+` : `${tier.min}-${tier.max}`;
            const isSelected = getCurrentTier() === tier;

            return (
              <div
                key={index}
                onClick={() => onQuantitySelect?.(tier.min)}
                className={`rounded-lg p-2 text-center border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-orange-50 border-orange-300 ring-2 ring-orange-200'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="text-xs font-medium">{rangeLabel} unités</div>
                <div className={`font-semibold text-xs ${
                  isSelected ? 'text-orange-700' : 'text-orange-600'
                }`}>
                  {tier.price.toFixed(0)} HTG
                </div>
                {tier.discount > 0 && (
                  <div className={`text-white text-xs rounded-full px-1.5 py-0.5 mt-1 font-medium ${
                    isSelected 
                      ? 'bg-orange-600' 
                      : 'bg-gradient-to-r from-orange-500 to-red-500'
                  }`}>
                    {tier.discount}% Off
                  </div>
                )}
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