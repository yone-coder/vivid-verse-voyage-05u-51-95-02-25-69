
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Clock } from "lucide-react";

interface LiveStockUpdatesProps {
  initialStock: number;
  highDemand?: boolean;
}

const LiveStockUpdates: React.FC<LiveStockUpdatesProps> = ({ 
  initialStock, 
  highDemand = false 
}) => {
  const [currentStock, setCurrentStock] = useState(initialStock);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [recentPurchases, setRecentPurchases] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [pulseProgress, setPulseProgress] = useState(false);
  
  // Calculate stock percentage
  const stockPercentage = Math.min(100, Math.max(5, (currentStock / 300) * 100));
  const isLowStock = currentStock < 50;
  
  useEffect(() => {
    // Simulate random stock updates
    const stockInterval = setInterval(() => {
      // 30% chance of stock decrease by 1-3 units
      if (Math.random() < 0.3) {
        const decrease = Math.floor(Math.random() * 3) + 1;
        setCurrentStock(prev => Math.max(5, prev - decrease));
        setRecentPurchases(prev => prev + decrease);
        setLastUpdate(new Date());
        
        // Flash update animation
        setIsUpdating(true);
        setTimeout(() => setIsUpdating(false), 1000);
        
        // Pulse progress bar
        setPulseProgress(true);
        setTimeout(() => setPulseProgress(false), 1000);
      }
    }, 15000); // Check every 15 seconds
    
    return () => clearInterval(stockInterval);
  }, []);

  return (
    <div className={`mt-3 p-3 rounded-md border ${isLowStock ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'} ${isUpdating ? 'animate-pulse' : ''}`}>
      <div className="flex justify-between items-center mb-1.5">
        <div className="text-sm font-medium flex items-center">
          {isLowStock ? (
            <>
              <AlertTriangle className="h-4 w-4 mr-1.5 text-red-500" />
              <span className="text-red-700">Low Stock Alert!</span>
            </>
          ) : (
            <>
              <Clock className="h-4 w-4 mr-1.5 text-amber-500" />
              <span className="text-amber-700">Stock Selling Fast</span>
            </>
          )}
        </div>
        <span className="text-xs text-gray-600">
          {currentStock} units left
        </span>
      </div>
      
      <Progress 
        value={stockPercentage} 
        className="h-1.5" 
        indicatorClassName={pulseProgress ? "animate-pulse" : ""}
      />
      
      <div className="flex justify-between mt-2 text-xs">
        <div className="text-gray-600">
          Last updated {Math.floor((new Date().getTime() - lastUpdate.getTime()) / 60000)} mins ago
        </div>
        {recentPurchases > 0 && (
          <div className="font-medium text-red-600">
            {recentPurchases} sold in last hour
          </div>
        )}
      </div>
      
      {highDemand && (
        <div className="mt-2 text-xs text-center bg-white/60 rounded py-1 font-medium text-red-600">
          High demand product - may sell out soon!
        </div>
      )}
    </div>
  );
};

export default LiveStockUpdates;
