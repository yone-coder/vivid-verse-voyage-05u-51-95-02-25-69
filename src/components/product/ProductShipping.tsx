
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

interface ShippingInfo {
  free: boolean;
  express: number;
  estimated: string;
  expressEstimated: string;
  returns: string;
}

interface ProductShippingProps {
  shippingInfo: ShippingInfo;
  isExpressSelected: boolean;
  onExpressChange: (value: boolean) => void;
}

const ProductShipping: React.FC<ProductShippingProps> = ({
  shippingInfo,
  isExpressSelected,
  onExpressChange
}) => {
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const { toast } = useToast();
  const [deliveryMethod, setDeliveryMethod] = useState(isExpressSelected ? "express" : "standard");

  // Update internal state when prop changes
  useEffect(() => {
    setDeliveryMethod(isExpressSelected ? "express" : "standard");
  }, [isExpressSelected]);

  const handleShippingChange = (value: string) => {
    setDeliveryMethod(value);
    const newValue = value === "express";
    onExpressChange(newValue);
    
    toast({
      title: newValue ? "Express shipping selected" : "Standard shipping selected",
      description: newValue 
        ? `Express shipping for $${shippingInfo.express} added to your order` 
        : "Free standard shipping selected"
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Shipping:</span>
        <div className="flex flex-col items-end">
          <div className="flex items-center">
            <Truck className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm text-green-600 font-medium">
              {isExpressSelected 
                ? `Express Shipping ($${shippingInfo.express})` 
                : "Free Standard Shipping"}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            Estimated delivery: {isExpressSelected ? shippingInfo.expressEstimated : shippingInfo.estimated}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 px-2 text-xs text-blue-600"
          onClick={() => setShowDeliveryOptions(!showDeliveryOptions)}
        >
          {showDeliveryOptions ? "Hide Options" : "More Delivery Options"}
        </Button>
      </div>
      
      {showDeliveryOptions && (
        <div className="mt-2 p-2 bg-gray-50 rounded-md border border-gray-200">
          <RadioGroup 
            value={deliveryMethod}
            onValueChange={handleShippingChange}
          >
            <div className="flex items-start space-x-2 mb-2">
              <RadioGroupItem value="standard" id="standard" className="mt-1" />
              <label htmlFor="standard" className="text-sm cursor-pointer flex-1">
                <div className="font-medium">Standard Shipping (Free)</div>
                <div className="text-xs text-gray-500">Estimated delivery: {shippingInfo.estimated}</div>
              </label>
            </div>
            
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="express" id="express" className="mt-1" />
              <label htmlFor="express" className="text-sm cursor-pointer flex-1">
                <div className="font-medium">Express Shipping (${shippingInfo.express})</div>
                <div className="text-xs text-gray-500">Estimated delivery: {shippingInfo.expressEstimated}</div>
              </label>
            </div>
          </RadioGroup>
        </div>
      )}
    </div>
  );
};

export default ProductShipping;
