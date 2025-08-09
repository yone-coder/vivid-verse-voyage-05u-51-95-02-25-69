import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '@/hooks/useProduct';

const ExpandableCard = () => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState('USD');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 23,
    minutes: 45,
    seconds: 30
  });
  const [showDiscount, setShowDiscount] = useState(false);
  
  const { id: paramId } = useParams<{ id: string }>();
  const { data: product } = useProduct(paramId || '');
  const navigate = useNavigate();

  const currencies = {
    USD: 'USD',
    HTG: 'HTG',
    EUR: 'EUR'
  };

  const currencyFlags = {
    USD: '🇺🇸',
    HTG: '🇭🇹',
    EUR: '🇪🇺'
  };

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Toggle discount display effect
  useEffect(() => {
    const discountTimer = setInterval(() => {
      setShowDiscount(prev => !prev);
    }, 3000);

    return () => clearInterval(discountTimer);
  }, []);

  if (!product) return null;

  const formatNumber = (num) => {
    return parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const convertToHTG = (usdPrice) => {
    const exchangeRate = 132;
    const price = parseFloat(usdPrice) || 0;
    return formatNumber(price * exchangeRate);
  };

  const convertToEUR = (usdPrice) => {
    const exchangeRate = 0.85;
    const price = parseFloat(usdPrice) || 0;
    return formatNumber(price * exchangeRate);
  };

  const convertPrice = (price) => {
    const numPrice = parseFloat(price) || 0;
    switch (currentCurrency) {
      case 'HTG':
        return convertToHTG(numPrice);
      case 'EUR':
        return convertToEUR(numPrice);
      default:
        return formatNumber(numPrice);
    }
  };

  const toggleCurrency = () => {
    const currencyOrder = ['USD', 'HTG', 'EUR'];
    const currentIndex = currencyOrder.indexOf(currentCurrency);
    const nextIndex = (currentIndex + 1) % currencyOrder.length;
    setCurrentCurrency(currencyOrder[nextIndex]);
  };

  const getPaymentMethods = (currency) => {
    const methods = {
      USD: [
        { name: 'PayPal', color: 'bg-blue-600' },
        { name: 'Stripe', color: 'bg-purple-600' },
        { name: 'Apple Pay', color: 'bg-gray-800' }
      ],
      HTG: [
        { name: 'Moncash', color: 'bg-red-600' },
        { name: 'Natcash', color: 'bg-green-600' },
        { name: 'Bank Transfer', color: 'bg-blue-800' }
      ],
      EUR: [
        { name: 'SEPA', color: 'bg-blue-700' },
        { name: 'PayPal', color: 'bg-blue-600' },
        { name: 'Klarna', color: 'bg-pink-600' }
      ]
    };
    return methods[currency] || methods.USD;
  };

  const handleShowMore = () => {
    navigate(`/product/${paramId}/description`);
  };

  const title = product.name;
  const description = product.description;

  // Check description length
  const descriptionLines = description ? description.split('\n').length : 0;
  const estimatedLines = description ? Math.ceil(description.length / 60) : 0;
  const totalLines = Math.max(descriptionLines, estimatedLines);
  const isExpandableDescription = description && totalLines >= 3 && totalLines <= 5;
  const isVeryLongDescription = description && totalLines > 5;
  const needsShowMore = isExpandableDescription || isVeryLongDescription;

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div className="bg-white w-full p-4 border rounded-lg shadow-sm">
      {/* Product Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-gray-800 font-bold leading-tight text-lg truncate flex-1">
          {title}
        </h3>
        {/* Deal Countdown Timer */}
        <div className="flex-shrink-0">
          <div className="relative h-5 overflow-hidden">
            <div className={`transition-transform duration-500 ease-in-out ${showDiscount ? '-translate-y-5' : 'translate-y-0'}`}>
              <div className="h-5 flex items-center space-x-1">
                <div className="text-red-700 text-sm font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
                <div className="text-gray-400 text-sm">:</div>
                <div className="text-red-700 text-sm font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-gray-400 text-sm">:</div>
                <div className="text-red-700 text-sm font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-gray-400 text-sm">:</div>
                <div className="text-red-700 text-sm font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              </div>
              <div className="h-5 flex items-center">
                <span className="text-red-600 text-sm font-semibold whitespace-nowrap">
                  Deal Ends Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      {description && (
        <div className="text-xs text-gray-700 leading-tight mt-3">
          <p className={`m-0 ${(!isDescriptionExpanded && needsShowMore) ? 'line-clamp-2' : ''}`}>
            {description}
          </p>

          <div className="flex items-center justify-between mt-2">
            <div className="flex-1">
              {needsShowMore ? (
                <>
                  {isExpandableDescription && (
                    <button
                      onClick={toggleDescription}
                      className="text-gray-600 hover:text-gray-800 font-semibold text-xs inline-flex items-center gap-1 transition-colors duration-200"
                    >
                      {isDescriptionExpanded ? 'Show less' : 'Show more'} 
                      {isDescriptionExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  )}
                  {isVeryLongDescription && (
                    <button
                      onClick={handleShowMore}
                      className="text-gray-600 hover:text-gray-800 font-semibold text-xs inline-flex items-center gap-1 transition-colors duration-200"
                    >
                      See more <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <button
                      onClick={toggleCurrency}
                      className="flex items-center bg-white border border-gray-300 rounded px-2 h-6 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="text-gray-600 text-sm font-bold flex items-center">
                        <span className="mr-1 rounded-full overflow-hidden w-4 h-4 flex items-center justify-center text-xs">{currencyFlags[currentCurrency]}</span>
                        {currencies[currentCurrency]}
                      </span>
                      <span className="ml-1 text-gray-600 hover:text-gray-800 transition-colors duration-200">
                        <ChevronDown className="w-4 h-4 font-black stroke-2" />
                      </span>
                      <span className="text-orange-500 text-sm font-black ml-2 h-6 flex items-center">
                        {convertPrice(product?.discount_price || product?.price || 104.99)}
                      </span>
                    </button>
                  </div>
                  <div className="flex items-center">
                    <div className="relative h-5 overflow-hidden">
                      <div className={`transition-transform duration-500 ease-in-out ${showDiscount ? '-translate-y-5' : 'translate-y-0'}`}>
                        <div className="h-5 flex items-center">
                          <span className="text-gray-400 text-sm line-through">
                            {convertPrice(product?.price || 149.99)}
                          </span>
                        </div>
                        <div className="h-5 flex items-center">
                          <span className="text-red-500 text-sm font-bold">
                            -20% OFF
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {needsShowMore && (
              <div className="flex items-center space-x-2 ml-2">
                <div className="flex items-center">
                  <button
                    onClick={toggleCurrency}
                    className="flex items-center bg-white border border-gray-300 rounded px-2 h-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="text-gray-600 text-sm font-bold flex items-center">
                      <span className="mr-1 rounded-full overflow-hidden w-4 h-4 flex items-center justify-center text-xs">{currencyFlags[currentCurrency]}</span>
                      {currencies[currentCurrency]}
                    </span>
                    <span className="ml-1 text-gray-600 hover:text-gray-800 transition-colors duration-200">
                      <ChevronDown className="w-4 h-4 font-black stroke-2" />
                    </span>
                    <span className="text-orange-500 text-sm font-black ml-2 h-6 flex items-center">
                      {convertPrice(product?.discount_price || product?.price || 104.99)}
                    </span>
                  </button>
                </div>
                <div className="flex items-center">
                  <div className="relative h-5 overflow-hidden">
                    <div className={`transition-transform duration-500 ease-in-out ${showDiscount ? '-translate-y-5' : 'translate-y-0'}`}>
                      <div className="h-5 flex items-center">
                        <span className="text-gray-400 text-sm line-through">
                          {convertPrice(product?.price || 149.99)}
                        </span>
                      </div>
                      <div className="h-5 flex items-center">
                        <span className="text-red-500 text-sm font-bold">
                          -20% OFF
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payment Methods */}
      <div className="mt-3">
        <div className="flex items-center justify-start">
          <div className="flex items-center flex-wrap gap-2">
            {getPaymentMethods(currentCurrency).map((payment, index) => (
              <div key={index} className={`${payment.color} text-white text-xs px-2 py-1 rounded font-bold`}>
                {payment.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Price Display when no description */}
      {!description && (
        <>
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex items-center">
              <button
                onClick={toggleCurrency}
                className="flex items-center bg-white border border-gray-300 rounded px-2 h-6 hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-gray-600 text-sm font-bold flex items-center">
                  <span className="mr-1 rounded-full overflow-hidden w-4 h-4 flex items-center justify-center text-xs">{currencyFlags[currentCurrency]}</span>
                  {currencies[currentCurrency]}
                </span>
                <span className="ml-1 text-gray-600 hover:text-gray-800 transition-colors duration-200">
                  <ChevronDown className="w-4 h-4 font-black stroke-2" />
                </span>
                <span className="text-orange-500 text-sm font-black ml-2 h-6 flex items-center">
                  {convertPrice(product?.discount_price || product?.price || 104.99)}
                </span>
              </button>
            </div>
            <div className="flex items-center">
              <div className="relative h-5 overflow-hidden">
                <div className={`transition-transform duration-500 ease-in-out ${showDiscount ? '-translate-y-5' : 'translate-y-0'}`}>
                  <div className="h-5 flex items-center">
                    <span className="text-gray-400 text-sm line-through">
                      {convertPrice(product?.price || 149.99)}
                    </span>
                  </div>
                  <div className="h-5 flex items-center">
                    <span className="text-red-500 text-sm font-bold">
                      -20% OFF
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-3">
            <div className="flex items-center justify-start">
              <div className="flex items-center flex-wrap gap-2">
                {getPaymentMethods(currentCurrency).map((payment, index) => (
                  <div key={index} className={`${payment.color} text-white text-xs px-2 py-1 rounded font-bold`}>
                    {payment.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpandableCard;