
import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Star, Truck, Clock, Users } from 'lucide-react';
import { toast } from "sonner";
import { useProduct } from '@/hooks/useProduct';
import { useParams } from 'react-router-dom';

interface StickyBuyButtonProps {
  selectedColor: string;
  colorPrices: Record<string, number>;
}

const StickyBuyButton = ({ selectedColor, colorPrices }: StickyBuyButtonProps) => {
  const { id } = useParams();
  const { data: product } = useProduct(id || '');
  
  const [isWishlist, setIsWishlist] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [likeCount, setLikeCount] = useState(156);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
    setLikeCount(prev => isWishlist ? prev - 1 : prev + 1);
    
    toast.success(isWishlist ? "Removed from wishlist" : "Added to wishlist", {
      description: isWishlist ? "Item removed from your wishlist" : "Item added to your wishlist"
    });
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
      toast.success("Added to cart", {
        description: "Item has been added to your cart"
      });
    }, 500);
  };

  const handleBuyNow = () => {
    setIsBuying(true);
    setTimeout(() => {
      setIsBuying(false);
      toast.info("Redirecting to checkout", {
        description: "Please wait while we prepare your order"
      });
    }, 500);
  };

  if (!product) {
    return null;
  }

  // Calculate discount percentage
  const discountPercentage = product.price && product.discount_price 
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  return (
    <div className="font-sans w-full h-full">
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 transform transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <span className="text-red-500 font-bold text-base mr-1">
                ${product.discount_price?.toFixed(2) || product.price?.toFixed(2)}
              </span>
              {product.discount_price && (
                <>
                  <span className="text-gray-400 line-through text-xs">${product.price?.toFixed(2)}</span>
                  <span className="text-red-500 text-xs ml-1">-{discountPercentage}%</span>
                </>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-orange-50 rounded-full px-2 py-0.5">
                <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                <span className="text-xs text-orange-600 ml-0.5">4.8</span>
              </div>
              
              <div className="flex items-center bg-blue-50 rounded-full px-2 py-0.5">
                <Users className="w-3 h-3 text-blue-500" />
                <span className="text-xs text-blue-600 ml-0.5">2.3k+</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center">
              <Truck className="w-3 h-3 text-green-600 mr-1" />
              <span className="text-green-600">Free Shipping</span>
              <span className="mx-1 text-gray-300">|</span>
              <Clock className="w-3 h-3 text-gray-500 mr-1" />
              <span className="text-gray-500">2-4 days delivery</span>
            </div>
            
            <div className="text-orange-500">
              In Stock
            </div>
          </div>
        </div>
        
        <div className="px-4 pt-1 pb-3">
          <div className="flex items-center justify-between gap-2">
            <button 
              onClick={toggleWishlist}
              className={`flex items-center justify-center bg-gray-100 rounded-full py-2 px-3 flex-shrink-0 transition-all duration-200 ${
                isWishlist ? 'bg-red-50' : 'hover:bg-gray-200'
              }`}
            >
              <Heart className={`w-4 h-4 transition-colors ${
                isWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`} />
              <span className={`text-xs ml-1 ${
                isWishlist ? 'text-red-500' : 'text-gray-600'
              }`}>{likeCount}</span>
            </button>
            
            <button 
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`flex-1 bg-gray-100 text-gray-700 py-2 rounded-full flex items-center justify-center text-sm transition-all duration-200 hover:bg-gray-200 ${
                isAddingToCart ? 'opacity-75' : ''
              }`}
            >
              <ShoppingCart className={`w-4 h-4 mr-1 ${
                isAddingToCart ? 'animate-bounce' : ''
              }`} />
              <span>Cart</span>
            </button>
            
            <button 
              onClick={handleBuyNow}
              disabled={isBuying}
              className={`flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-full font-medium text-sm transition-all duration-200 hover:opacity-90 ${
                isBuying ? 'opacity-75' : ''
              }`}
            >
              <span className={isBuying ? 'animate-pulse' : ''}>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyBuyButton;
