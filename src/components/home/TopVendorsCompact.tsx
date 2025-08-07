import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  Plus, 
  Store,
  Users, 
} from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/integrations/supabase/products";
import { fetchAllSellers } from "@/integrations/supabase/sellers";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import SectionHeader from './SectionHeader';

// Utility functions
const formatFollowers = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

const getSellerLogoUrl = (imagePath) => {
  if (!imagePath) return "";
  const { data } = supabase.storage.from('seller-logos').getPublicUrl(imagePath);
  return data.publicUrl;
};

const getProductImageUrl = (imagePath) => {
  if (!imagePath) return "";
  const { data } = supabase.storage.from('product-images').getPublicUrl(imagePath);
  return data.publicUrl;
};

// Custom Seller Avatar SVG Component
const DefaultSellerAvatar = ({ className = "w-6 h-6" }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shop/Store building outline */}
    <path 
      d="M3 21H21V9L18 6.5L15 4L12 6.5L9 4L6 6.5L3 9V21Z" 
      fill="#E5E7EB" 
      stroke="#9CA3AF" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    {/* Store front */}
    <path 
      d="M6 21V12H10V21" 
      fill="#F3F4F6" 
      stroke="#9CA3AF" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M14 21V12H18V21" 
      fill="#F3F4F6" 
      stroke="#9CA3AF" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    {/* Awning/roof detail */}
    <path 
      d="M2 9H22" 
      stroke="#9CA3AF" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    {/* Windows */}
    <circle cx="8" cy="16.5" r="1" fill="#9CA3AF"/>
    <circle cx="16" cy="16.5" r="1" fill="#9CA3AF"/>
  </svg>
);

// Alternative User/Profile SVG Component
const DefaultProfileAvatar = ({ className = "w-6 h-6" }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Circle background */}
    <circle cx="12" cy="12" r="12" fill="#E5E7EB"/>
    {/* Person silhouette */}
    <circle cx="12" cy="8" r="3" fill="#9CA3AF"/>
    <path 
      d="M6.168 18.849C6.718 16.761 9.143 15.25 12 15.25s5.282 1.511 5.832 3.599" 
      fill="#9CA3AF"
    />
  </svg>
);

// Verification SVG Component
const VerificationBadge = () => (
  <svg width="16" height="16" viewBox="0 0 128 128" className="flex-shrink-0 ml-1">
    <path d="M53 9c2.309 1.383 2.309 1.383 4.625 3.063 3.385 2.491 3.385 2.491 7.5 3.124 2.574-1.063 4.098-2.063 6.25-3.75 2.613-1.983 4.454-2.87 7.75-3.062C83 9 83 9 85.75 10.813 88.855 15.21 90.398 19.89 92 25l2.633.113c11.734.67 11.734.67 16.367 3.887 2.165 4.331 1.395 9.793-.062 14.25L110 46c-.319 2.576-.319 2.576 1 5 1.915 1.646 3.89 3.073 5.992 4.473 3.135 2.385 4.795 4.461 5.57 8.34-.912 5.173-4.204 8.376-8.296 11.519-1.391.937-2.825 1.81-4.266 2.668l.438 1.617C111.87 85.366 112.883 91.082 112 97c-2.191 3.098-3.41 3.804-7 5-2.226.225-4.456.408-6.687.563l-3.575.253L92 103l-.953 2.738-1.297 3.575-1.266 3.55C86.967 116.07 86.076 117.331 83 119c-6.747 1.03-9.514-.801-14.898-4.715-2.154-1.552-2.154-1.552-5.352-1.41-3.109 1.272-5.219 2.936-7.75 5.125-3.638 1.213-6.177 1.395-10 1-5.617-3.788-7.06-9.813-9-16l-2.633-.113c-11.734-.67-11.734-.67-16.367-3.887-2.165-4.331-1.395-9.793.063-14.25L18 82c.319-2.576.319-2.576-1-5-1.915-1.646-3.89-3.073-5.992-4.473-3.135-2.385-4.795-4.461-5.57-8.34.912-5.173 4.204-8.376 8.296-11.519C15.125 51.731 16.56 50.858 18 50l-.437-1.617C16.13 42.634 15.117 36.918 16 31c2.191-3.098 3.41-3.804 7-5 2.226-.225 4.456-.408 6.688-.562l3.574-.254L36 25l.953-2.738 1.297-3.575 1.266-3.55C42.313 9.225 46.63 7.539 53 9" fill="#49ADF4"/>
    <path d="M80.969 55.168 83 56l1 5a5562 5562 0 0 1-8.625 6.75l-2.45 1.922A673 673 0 0 1 66 75l-1.784 1.38c-3.675 2.688-3.675 2.688-6.192 2.372-3.443-1.28-5.782-3.957-8.336-6.502l-1.706-1.594C46.387 69.078 46.387 69.078 44 66c.145-2.89.145-2.89 1-5 2.23-.746 2.23-.746 5-1 2.238 1.652 2.238 1.652 4.313 3.938l2.113 2.277L58 68c5.678-1.802 9.9-5.595 14.473-9.275 4.892-3.76 4.892-3.76 8.496-3.557" fill="#F9FCFE"/>
  </svg>
);

// Vendor Card Component
const VendorCard = ({ vendor }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const displayProducts = vendor.products.slice(0, 4);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl border border-gray-300 overflow-hidden hover:border-gray-400 transition-all duration-300">

        {/* Products Grid */}  
        <div className="px-2 pt-2 pb-1 relative">  
          {vendor.discount && (  
            <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">  
              {vendor.discount}  
            </div>  
          )}

          <div className="grid grid-cols-4 gap-1">  
            {displayProducts.map(product => (  
              <button 
                key={product.id} 
                className="group cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >  
                <div className="aspect-square rounded-md border border-gray-100 bg-gray-50 overflow-hidden hover:border-gray-200 transition-colors">  
                  {product.image ? (
                    <img   
                      src={product.image}   
                      alt=""   
                      className="h-full w-full object-contain hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Store size={16} />
                    </div>
                  )}
                </div>
              </button>  
            ))}  
          </div>  
        </div>

        {/* Vendor Info */}
        <div className="px-2 py-1">
          <div className="flex items-center gap-2">

            {/* Vendor Avatar */}
            <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
              {vendor.image && !imageError ? (
                <img   
                  src={vendor.image}   
                  alt={vendor.name}   
                  className="w-full h-full object-cover rounded-full"  
                  onError={() => setImageError(true)}
                  loading="lazy"
                />
              ) : (
                <DefaultSellerAvatar className="w-6 h-6" />
              )}
            </div>

            {/* Vendor Details */}
            <div className="flex-1 min-w-0">
              {/* Name and Verification */}
              <div className="flex items-center mb-0.5">  
                <h3 className="font-medium text-xs truncate mr-1">{vendor.name}</h3>  
                {vendor.verified && <VerificationBadge />}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-gray-500">  
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-yellow-500">  
                    <Star size={10} className="fill-yellow-500" />  
                    <span className="font-medium ml-0.5 text-gray-600">{vendor.rating}</span>  
                  </div>
                  <div className="w-px h-3 bg-gray-300"></div>
                  <div className="flex items-center">  
                    <Users size={10} className="mr-0.5" />  
                    {vendor.followers}  
                  </div>
                </div>
                <span className="text-xs font-bold text-white bg-gray-400 px-1.5 py-0.5 rounded-full">#{vendor.rank}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}  
        <div className="px-2 pb-2 grid grid-cols-2 gap-2">  
          <button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-xs font-medium py-1.5 px-2 rounded-full transition-colors">  
            Visit Store  
          </button>  
          <button   
            className={`flex items-center justify-center text-xs font-medium py-1.5 px-2 rounded-full transition-colors ${  
              isFollowing   
                ? "bg-gray-100 text-gray-800 hover:bg-gray-200"   
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"  
            }`}  
            onClick={() => setIsFollowing(!isFollowing)}  
          >  
            {isFollowing ? "Following" : "Follow"}  
          </button>  
        </div>
      </div>
    </div>
  );
};

// Custom hook for mobile detection
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return isMobile;
};

// Main Carousel Component
const VendorCarousel = () => {
  const isMobile = useIsMobile();
  const scrollContainerRef = useRef(null);

  const { data: sellers = [], isLoading: sellersLoading } = useQuery({
    queryKey: ['sellers'],
    queryFn: fetchAllSellers,
  });

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  const isLoading = sellersLoading || productsLoading;

  // Transform data
  const vendors = sellers
    .map((seller, index) => {
      const sellerProducts = products
        .filter(product => product.seller_id === seller.id)
        .slice(0, 4)
        .map(product => {
          const productImages = Array.isArray(product.product_images) ? product.product_images : [];
          const firstImage = productImages.length > 0 ? productImages[0] : null;

          return {
            id: product.id,
            image: firstImage?.src || "",
            price: `$${product.price}`,
            discount: product.discount_price ? `${Math.round((1 - product.discount_price / product.price) * 100)}%` : null
          };
        });

      // Handle different types of image URLs
      let imageUrl = "";
      if (seller.image_url) {
        // If it's already a full URL (like Unsplash), use it directly
        if (seller.image_url.startsWith('http')) {
          imageUrl = seller.image_url;
        } else {
          // If it's a filename, get it from Supabase storage
          imageUrl = getSellerLogoUrl(seller.image_url);
        }
      }

      return {
        id: seller.id,
        name: seller.name,
        image: imageUrl,
        verified: seller.verified,
        rating: seller.rating?.toFixed(1) || "0.0",
        sales: seller.total_sales,
        followers: formatFollowers(seller.followers_count),
        category: seller.category || "general",
        discount: seller.category === "flash-deals" ? "30%" : null,
        products: sellerProducts,
        rank: index + 1
      };
    })
    .filter(vendor => vendor.products.length >= 4);

  const cardWidth = isMobile ? "66%" : "33.333%";

  const middleElement = (
    <div className="flex items-center gap-1.5 bg-white/20 text-white text-xs font-medium px-3 py-0.5 rounded-full backdrop-blur-sm">
      <Users className="w-4 h-4 shrink-0" />
      <span className="whitespace-nowrap">5K+ Vendors</span>
    </div>
  );

  if (isLoading) {
    return (
      <div className="w-full relative">
        <SectionHeader
          title="TOP VENDORS"
          icon={Store}
          viewAllLink="/vendors"
          viewAllText="View All"
          middleElement={middleElement}
        />
        <div className="flex overflow-x-auto pl-2 space-x-4">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-2/3 md:w-1/3 bg-gray-200 rounded-2xl h-40 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <SectionHeader
        title="TOP VENDORS"
        icon={Store}
        viewAllLink="/vendors"
        viewAllText="View All"
        middleElement={middleElement}
      />

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto pl-2 scrollbar-none w-full"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: '8px'
        }}
      >
        {vendors.map((vendor) => (
          <div 
            key={vendor.id}
            className="flex-shrink-0 mr-[3vw]"
            style={{ 
              width: cardWidth,
              scrollSnapAlign: 'start'
            }}
          >
            <VendorCard vendor={vendor} />
          </div>
        ))}

        <div className="flex-shrink-0 w-2"></div>
      </div>
    </div>
  );
};

export default VendorCarousel;