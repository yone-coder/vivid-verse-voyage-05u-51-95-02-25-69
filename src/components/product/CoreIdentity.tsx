import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '@/hooks/useProduct';

const ExpandableCard = () => {
  const [isTitleExpanded, setIsTitleExpanded] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 23, seconds: 45 });

  const { id: paramId } = useParams<{ id: string }>();
  const { data: product } = useProduct(paramId || '');
  const navigate = useNavigate();

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Timer reached zero, could reset or stop
          hours = 5;
          minutes = 23;
          seconds = 45;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!product) return null;

  // Currency conversion function
  const convertToHTG = (usdPrice) => {
    const exchangeRate = 132; // 1 USD = 132 HTG
    const price = parseFloat(usdPrice) || 0;
    return (price * exchangeRate).toFixed(2);
  };

  const title = product.name;
  const description = product.description;
  const badge = product.flash_deal ? "FLASH DEAL" : "LIMITED";
  const additionalBadges = product.tags?.filter(tag => tag !== 'flash-deals') || ["CHOICE"];

  // Check description length for different behaviors (only if description exists)
  const descriptionLines = description ? description.split('\n').length : 0;
  const estimatedLines = description ? Math.ceil(description.length / 60) : 0; // Approximate characters per line
  const totalLines = Math.max(descriptionLines, estimatedLines);
  const isExpandableDescription = description && totalLines >= 3 && totalLines <= 5;
  const isVeryLongDescription = description && totalLines > 5;

  const handleShowMore = () => {
    navigate(`/product/${paramId}/description`);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div className="bg-white w-full">
      {/* Product Header: Name + Badge */}
      <div className="flex items-start justify-between gap-3">
        <h3 
          className="text-gray-800 font-bold cursor-pointer hover:text-red-500 transition-colors duration-200 leading-tight text-lg truncate flex-1"
          onClick={() => setIsTitleExpanded(!isTitleExpanded)}
        >
          {title}
        </h3>
      </div>

      {/* Product Description */}
      {description && (
        <div className="text-xs text-gray-700 leading-tight">
          <p className={`m-0 ${(isExpandableDescription && !isDescriptionExpanded) || isVeryLongDescription ? 'line-clamp-2' : ''}`}>
            {description}
          </p>

          <div className="flex items-center justify-between mt-2">
            {isExpandableDescription && (
              <button
                onClick={toggleDescription}
                className="text-red-500 hover:text-red-600 font-semibold text-xs inline-flex items-center gap-1 transition-colors duration-200"
              >
                {isDescriptionExpanded ? 'Show less' : 'Show more'} 
                {isDescriptionExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            )}

            {isVeryLongDescription && (
              <button
                onClick={handleShowMore}
                className="text-red-500 hover:text-red-600 font-semibold text-xs inline-flex items-center gap-1 transition-colors duration-200"
              >
                See more <ChevronRight className="w-3 h-3" />
              </button>
            )}

            {/* Price Display - Now in HTG */}
            <div className="flex items-center space-x-2 ml-auto">
              <span className="text-orange-500 text-lg font-black">
                HTG {convertToHTG(product?.discount_price || product?.price || 104.99)}
              </span>
              <span className="text-gray-400 text-sm line-through">
                HTG {convertToHTG(product?.price || 149.99)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Price Display when no description */}
      {!description && (
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-orange-500 text-lg font-black">
            HTG {convertToHTG(product?.discount_price || product?.price || 104.99)}
          </span>
          <span className="text-gray-400 text-sm line-through">
            HTG {convertToHTG(product?.price || 149.99)}
          </span>
        </div>
      )}
    </div>
  );
};

export default ExpandableCard;