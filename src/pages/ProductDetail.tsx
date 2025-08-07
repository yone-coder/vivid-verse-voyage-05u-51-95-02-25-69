// Updated ProductDetail component - Key changes in BundleDeals section
import React, { useState, useEffect, useRef } from "react";
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useProduct, useProductAnalytics } from "@/hooks/useProduct";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductHeader from "@/components/product/ProductHeader";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductSectionWrapper from "@/components/product/ProductSectionWrapper";
import ToggleExpandButton from "@/components/product/ToggleExpandButton";

import { useVariantStockDecay } from "@/hooks/useVariantStockDecay";
import CoreIdentity from "@/components/product/CoreIdentity";
import PricingSection from '@/components/product/PricingSection';
import ProductColorVariants from "@/components/product/ProductColorVariants";
import BundleDeals from "@/components/product/BundleDeals";
import ShippingOptionsComponent from '@/components/product/ShippingOptionsComponent';
import ProductDescriptionSection from '@/components/product/ProductDescriptionSection';

import SellerInfo from '@/components/product/SellerInfo';

const DEFAULT_PRODUCT_ID = "aae97882-a3a1-4db5-b4f5-156705cd10ee";
const MAX_QUANTITY = 250;

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showVariants, setShowVariants] = useState(true);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [isExpressSelected, setIsExpressSelected] = useState(false);
  const [selectedWarranty, setSelectedWarranty] = useState("none");
  const [maxQuantityReached, setMaxQuantityReached] = useState(false);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [showLiveData, setShowLiveData] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(44);
  const [activeSection, setActiveSection] = useState("overview");

  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id: paramId } = useParams<{ id: string }>();
  const contentRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const productId = paramId || DEFAULT_PRODUCT_ID;

  const { data: product, isLoading } = useProduct(productId);
  const { data: analytics, isLoading: analyticsLoading } = useProductAnalytics(productId);

  const colorPrices = {
    "Black": 79.99,
    "White": 89.99,
    "Jet Black": 89.99,
    "Blue": 219.99,
    "Red": 229.99
  };

  const colorVariants = [
    { name: "Black", price: colorPrices.Black, stock: 48, image: "", bestseller: true },
    { name: "White", price: colorPrices.White, stock: 124, image: "", bestseller: false },
    { name: "Jet Black", price: colorPrices["Jet Black"], stock: 78, image: "", bestseller: false },
    { name: "Blue", price: colorPrices.Blue, stock: 42, image: "", bestseller: false },
    { name: "Red", price: colorPrices.Red, stock: 16, image: "", bestseller: false, limited: true }
  ];

  const { variantStockInfo, activateVariant, getTimeRemaining, resetVariant, resetAllVariants } = useVariantStockDecay({
    variants: colorVariants,
    decayPeriod: 12 * 60 * 60 * 1000
  });

  useEffect(() => {
    if (selectedColor && activateVariant) {
      activateVariant(selectedColor);
    }
  }, [selectedColor, activateVariant]);

  const triggerHaptic = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
      console.log('Haptics not available');
    }
  };

  const incrementQuantity = async () => {
    if (quantity < MAX_QUANTITY) {
      await triggerHaptic();
      setQuantity(prev => prev + 1);
      if (quantity === MAX_QUANTITY - 1) {
        setMaxQuantityReached(true);
        toast({
          title: "Maximum quantity reached",
          description: "You've reached the maximum allowed quantity for this item.",
          variant: "destructive"
        });
      }
    }
  };

  const decrementQuantity = async () => {
    if (quantity > 1) {
      await triggerHaptic();
      setQuantity(prev => prev - 1);
      if (maxQuantityReached) {
        setMaxQuantityReached(false);
      }
    }
  };

  const handleShare = async () => {
    await triggerHaptic();
    if (navigator.share) {
      navigator.share({
        title: product?.name || "Product",
        text: `Check out this ${product?.name || "product"}!`,
        url: window.location.href,
      }).catch((error) => {
        console.log('Error sharing:', error);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Product link copied to clipboard",
      });
    }
  };

  const toggleFavorite = async () => {
    await triggerHaptic();
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Item removed from your wishlist" : "Item added to your wishlist",
    });
  };

  const addToCart = async () => {
    await triggerHaptic();
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product?.name || "Product"} (${selectedColor}) added to your cart`,
    });
  };

  const buyNow = async () => {
    await triggerHaptic();

    // Navigate to checkout with product details
    const checkoutParams = new URLSearchParams({
      productName: product?.name || "Product",
      quantity: quantity.toString(),
      color: selectedColor,
      price: currentPrice.toString(),
    });

    navigate(`/product-checkout?${checkoutParams.toString()}`);
  };

  const handleCartClick = () => {
    toast({
      title: "Cart",
      description: "Opening your shopping cart",
    });
  };

  const handleResetStock = () => {
    resetAllVariants();
    toast({
      title: "Stock Reset",
      description: "All product variants stock has been reset to initial values",
    });
  };

  const scrollToSection = (section: string) => {
    const refs = {
      overview: overviewRef,
      description: descriptionRef,
      reviews: reviewsRef
    };

    const targetRef = refs[section as keyof typeof refs];
    if (targetRef?.current) {
      const yOffset = -80; // Account for sticky header
      const y = targetRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setActiveSection(section);
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      if (reviewsRef.current && scrollPosition >= reviewsRef.current.offsetTop) {
        setActiveSection("reviews");
      } else if (descriptionRef.current && scrollPosition >= descriptionRef.current.offsetTop) {
        setActiveSection("description");
      } else {
        setActiveSection("overview");
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-500">The product you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  const productImages = product?.product_images?.map(img => img.src) || [];
  const currentPrice = product?.discount_price || product?.price || 0;
  const originalPrice = product?.price || 0;

  // Convert USD to HTG (using the same conversion as in CoreIdentity)
  const convertToHTG = (usdPrice) => {
    const exchangeRate = 132; // 1 USD = 132 HTG
    const price = parseFloat(usdPrice) || 0;
    return price * exchangeRate;
  };

  // Get the HTG price for bundle deals
  const baseHTGPrice = convertToHTG(currentPrice);

  const selectedVariant = colorVariants.find((v) => v.name === selectedColor);
  const selectedVariantStockInfo = selectedColor ? variantStockInfo[selectedColor] : undefined;

  const currentVariant = colorVariants.find(v => v.name === selectedColor);
  const currentStock = selectedVariantStockInfo?.currentStock !== undefined 
    ? Math.floor(selectedVariantStockInfo.currentStock)
    : (currentVariant ? currentVariant.stock : 0);

  return (
    <div className="flex flex-col min-h-screen bg-white overscroll-none" ref={contentRef}>
      <ProductHeader 
        activeSection={activeSection}
        onTabChange={scrollToSection}
      />

      <div className="relative w-full bg-transparent" ref={overviewRef}>
        <ProductImageGallery images={productImages.length > 0 ? productImages : ["/placeholder.svg"]} />
      </div>

      <div className="flex-1 overscroll-none pb-[112px]"> {/* Add bottom padding */}
        <div className="bg-white pb-20">
          <ProductSectionWrapper>
            <CoreIdentity />
          </ProductSectionWrapper>

     {/* Moved SellerInfo here, right below CoreIdentity */}
          <ProductSectionWrapper className="!py-1"> {/* Reduced padding */}
  <SellerInfo seller={product?.sellers} />
</ProductSectionWrapper>


          <ProductSectionWrapper>
            <ProductColorVariants />
          </ProductSectionWrapper>

          <ProductSectionWrapper>
            {/* UPDATED: Pass the actual product price in HTG to BundleDeals */}
            <BundleDeals 
              currentQuantity={quantity}
              onQuantitySelect={setQuantity}
              basePrice={baseHTGPrice} // Pass the converted HTG price
            />
          </ProductSectionWrapper>

          <ProductSectionWrapper>
            <ShippingOptionsComponent />
          </ProductSectionWrapper>

         
        </div>
      </div>

      {/* Sticky Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
        {/* Social Buttons */}
        <div className="flex justify-center items-center gap-6 px-4 py-3 border-b border-gray-100">
          <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Like</span>
          </button>

          <button 
            onClick={() => navigate(`/product/${productId}/comments`)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm font-medium">Comment</span>
          </button>

          <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span className="text-sm font-medium">Share</span>
          </button>

          <button className="flex items-center gap-2 text-gray-600 hover:text-purple-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span className="text-sm font-medium">Save</span>
          </button>
        </div>

        {/* Checkout Button */}
        <div className="px-4 py-3">
          <Button 
            onClick={buyNow}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-full font-medium text-base hover:opacity-90"
          >
            Proceed to checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;