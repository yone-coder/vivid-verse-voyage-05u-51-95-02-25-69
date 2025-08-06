
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Users, Clock, AlertCircle } from 'lucide-react';

interface LivePurchaseBannerProps {
  productName: string;
}

const LivePurchaseBanner: React.FC<LivePurchaseBannerProps> = ({ productName }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [bannerType, setBannerType] = useState<'purchase' | 'visitors' | 'urgent'>('purchase');
  const [purchaseCount, setPurchaseCount] = useState(0);
  
  useEffect(() => {
    // Show first banner after 5 seconds
    const initialTimeout = setTimeout(() => {
      setPurchaseCount(Math.floor(Math.random() * 20) + 10);
      setBannerType('purchase');
      setIsVisible(true);
      
      // Hide after 5 seconds
      setTimeout(() => setIsVisible(false), 5000);
    }, 5000);
    
    // Set up interval for showing banners
    const bannerInterval = setInterval(() => {
      // Choose banner type
      const randomType = Math.random();
      if (randomType < 0.4) {
        setPurchaseCount(Math.floor(Math.random() * 20) + 10);
        setBannerType('purchase');
      } else if (randomType < 0.7) {
        setBannerType('visitors');
      } else {
        setBannerType('urgent');
      }
      
      setIsVisible(true);
      
      // Hide after 5 seconds
      setTimeout(() => setIsVisible(false), 5000);
    }, 30000); // Show a banner every 30 seconds
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(bannerInterval);
    };
  }, []);
  
  const getBannerContent = () => {
    switch (bannerType) {
      case 'purchase':
        return (
          <div className="flex items-center">
            <ShoppingBag className="w-4 h-4 mr-2 text-green-500" />
            <span>
              <strong>{purchaseCount} people</strong> purchased this {productName} in the last 24 hours!
            </span>
          </div>
        );
      case 'visitors':
        const visitors = Math.floor(Math.random() * 30) + 20;
        return (
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2 text-blue-500" />
            <span>
              <strong>{visitors} shoppers</strong> are viewing this product right now!
            </span>
          </div>
        );
      case 'urgent':
        return (
          <div className="flex items-center">
            <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
            <span>
              <strong>Limited stock!</strong> This item may sell out soon.
            </span>
          </div>
        );
    }
  };
  
  const getBannerColor = () => {
    switch (bannerType) {
      case 'purchase':
        return 'bg-green-100 border-green-200';
      case 'visitors':
        return 'bg-blue-100 border-blue-200';
      case 'urgent':
        return 'bg-red-100 border-red-200';
    }
  };
  
  return (
    <div className="fixed top-16 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`text-sm font-medium py-2 px-4 rounded-b-lg shadow-md border-x border-b ${getBannerColor()} max-w-md mx-auto`}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {getBannerContent()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LivePurchaseBanner;
