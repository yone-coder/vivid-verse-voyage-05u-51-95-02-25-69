import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight } from 'lucide-react';

const RecommendationSkeleton = () => (
  <div className="w-[30%] md:w-[calc(25vw)] lg:w-[calc(16.66vw)] flex-shrink-0">
    <Skeleton className="aspect-square mb-1" />
    <Skeleton className="h-3 w-1/2" />
  </div>
);

const MinimalProductCard = ({ product }) => {
  const discount = product.discount_price ?
    Math.round(((product.price - product.discount_price) / product.price) * 100) : 0;

  return (
    <div className="h-full">
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-md mb-1.5">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {discount > 0 && (
            <div className="absolute top-0 left-0 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-br-md font-medium">
              -{discount}% OFF
            </div>
          )}
        </div>
        <div>
          <div className="flex items-baseline gap-1">
            <div className="text-red-500 font-semibold text-sm">
              ${(product.discountPrice || product.price).toFixed(2)}
            </div>
            {product.discountPrice && (
              <div className="text-xs text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </div>
            )}
          </div>
          <div className="text-[10px] text-gray-500 truncate max-w-full mt-0.5">
            {product.name}
          </div>
        </div>
      </Link>
    </div>
  );
};

// Dot indicator component for cleaner implementation
const DotIndicator = ({ active, index, currentPage, onClick }) => {
  const isActive = index === currentPage;

  return (
    <button
      onClick={onClick}
      className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 px-0.5"
      aria-label={`Page ${index + 1}`}
      aria-current={isActive ? "true" : "false"}
    >
      <div className="relative h-[3px] w-5 overflow-hidden rounded-full">
        {/* Background track */}
        <div 
          className={`absolute inset-0 rounded-full ${
            isActive ? "bg-gray-200" : "bg-gray-200 group-hover:bg-gray-300"
          }`}
        />

        {/* Fill indicator - only shown when active */}
        {isActive && (
          <div 
            className="absolute inset-y-0 left-0 w-full bg-black rounded-full origin-left"
            style={{
              transform: "scaleX(0)",
              animation: "4s linear forwards running fillDot"
            }}
          />
        )}
      </div>
    </button>
  );
};

const ProductRecommendations = ({ products = [], loading = false }) => {
  const scrollContainerRef = useRef(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const autoScrollTimeoutRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);

  const formattedProducts = Array.isArray(products) ? products.map(product => ({
    id: String(product.id),
    price: product.price || 0,
    discountPrice: product.discount_price,
    name: product.name || "Product Name",
    image: product.product_images?.[0]?.src || "https://placehold.co/300x300?text=No+Image",
    ...product
  })) : [];

  const firstRow = formattedProducts.slice(0, Math.ceil(formattedProducts.length / 2));
  const secondRow = formattedProducts.slice(Math.ceil(formattedProducts.length / 2));

  // Reset autoScroll interval when page changes
  useEffect(() => {
    if (pageCount <= 1) return;

    // Clear existing interval
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }

    // Set new interval
    autoScrollIntervalRef.current = setInterval(() => {
      setPage((prev) => {
        const nextPage = (prev + 1) % pageCount;
        scrollToPage(nextPage);
        return nextPage;
      });
    }, 4000);

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [page, pageCount]);

  const scrollToPage = (index) => {
    const container = scrollContainerRef.current;
    if (container) {
      const width = container.clientWidth;
      setIsAutoScrolling(true);
      container.scrollTo({ left: index * width, behavior: 'smooth' });
      setPage(index);

      // Reset auto-scrolling flag after animation completes
      clearTimeout(autoScrollTimeoutRef.current);
      autoScrollTimeoutRef.current = setTimeout(() => {
        setIsAutoScrolling(false);
      }, 500);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const updatePage = () => {
      if (isAutoScrolling) return;
      const scrollLeft = container.scrollLeft;
      const width = container.clientWidth;
      const newPage = Math.round(scrollLeft / width);
      if (newPage !== page) {
        setPage(newPage);
      }
    };

    const calculatePageCount = () => {
      const width = container.clientWidth;
      const scrollWidth = container.scrollWidth;
      setPageCount(Math.ceil(scrollWidth / width));
    };

    container.addEventListener('scroll', updatePage);
    window.addEventListener('resize', calculatePageCount);
    calculatePageCount();

    return () => {
      container.removeEventListener('scroll', updatePage);
      window.removeEventListener('resize', calculatePageCount);
    };
  }, [formattedProducts, isAutoScrolling, page]);

  return (
    <div className="py-2">
      <div className="pb-2">
        <div className="flex items-center justify-between px-2 mb-2">
          <h2 className="text-base font-medium">Recommended for You</h2>
          <Button variant="link" className="text-xs text-gray-500 p-0 h-auto" asChild>
            <Link to="/search?category=recommended" className="flex items-center">
              View All <ChevronRight className="h-3 w-3 ml-0.5" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="space-y-2">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-2">
              {Array(3).fill(0).map((_, index) => (
                <RecommendationSkeleton key={`row1-${index}`} />
              ))}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-2">
              {Array(3).fill(0).map((_, index) => (
                <RecommendationSkeleton key={`row2-${index}`} />
              ))}
            </div>
          </div>
        ) : formattedProducts.length > 0 ? (
          <>
            <div
              className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              style={{ scrollPaddingLeft: '0.5rem', WebkitOverflowScrolling: 'touch' }}
              ref={scrollContainerRef}
            >
              <div className="space-y-2 pl-2 inline-flex flex-col min-w-full">
                <div className="flex gap-2">
                  {firstRow.map((product) => (
                    <div
                      key={product.id}
                      className="flex-shrink-0 snap-start"
                      style={{ width: 'calc(18% - 0.5rem)' }}
                    >
                      <MinimalProductCard product={product} />
                    </div>
                  ))}
                  <div className="flex-none w-4" />
                </div>

                <div className="flex gap-2">
                  {secondRow.map((product) => (
                    <div
                      key={product.id}
                      className="flex-shrink-0 snap-start"
                      style={{ width: 'calc(18% - 0.5rem)' }}
                    >
                      <MinimalProductCard product={product} />
                    </div>
                  ))}
                  <div className="flex-none w-4" />
                </div>
              </div>
            </div>

            {/* Ultra Sleek Dots Navigation */}
            {pageCount > 1 && (
              <div className="flex justify-center mt-3 gap-1">
                {Array.from({ length: pageCount }).map((_, i) => (
                  <DotIndicator 
                    key={i}
                    index={i}
                    currentPage={page}
                    onClick={() => scrollToPage(i)}
                    active={i === page}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">No recommendations available right now</p>
          </div>
        )}
      </div>

      {/* Global styles for animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fillDot {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}} />
    </div>
  );
};

export default ProductRecommendations;