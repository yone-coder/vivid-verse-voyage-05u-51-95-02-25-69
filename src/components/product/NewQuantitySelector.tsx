import React, { useState } from 'react';
import { Package, Clock, ChevronUp, ChevronDown } from 'lucide-react';
import ProductSectionHeader from './ProductSectionHeader';

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
}

const BundleDeals: React.FC<BundleDealsProps> = ({ 
  className = "" 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const visibleTiers = isExpanded ? PRICE_TIERS : PRICE_TIERS.slice(0, 3);
  const maxDiscount = Math.max(...PRICE_TIERS.map(tier => tier.discount));

  return (
    <div className={`mb-2 text-xs ${className}`}>
      {/* Header */}
      <ProductSectionHeader
        title="Bundle Deals"
        icon={Package}
        rightContent={
          <div className="flex items-center gap-2">
            <div className="bg-orange-100 text-orange-600 text-xs px-1.5 py-0.5 rounded-full font-medium">
              Save up to {maxDiscount}%
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              <Clock size={12} className="mr-1" />
              Limited time offer
            </div>
          </div>
        }
      />

      {/* Tiers grid */}
      <div className="grid grid-cols-3 gap-1.5 mb-3">
        {visibleTiers.map((tier, index) => {
          const rangeLabel = tier.max === Infinity ? `${tier.min}+` : `${tier.min}-${tier.max}`;

          return (
            <div
              key={index}
              className="rounded-lg p-2 text-center border bg-gray-50 border-gray-200 transition-all"
            >
              <div className="text-xs font-medium">{rangeLabel} pcs</div>
              <div className="text-orange-600 font-semibold text-xs">
                ${tier.price.toFixed(2)} each
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full px-1.5 py-0.5 mt-1 font-medium">
                {tier.discount}% Off
              </div>
            </div>
          );
        })}
      </div>

      {/* Toggle button */}
      <div className="text-center mt-1">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-red-500 text-xs font-medium flex items-center justify-center mx-auto hover:text-red-600 transition-colors"
        >
          {isExpanded ? 'View less' : 'View more'}
          {isExpanded ? (
            <ChevronUp size={12} className="ml-1" />
          ) : (
            <ChevronDown size={12} className="ml-1" />
          )}
        </button>
      </div>
    </div>
  );
};

export default BundleDeals;