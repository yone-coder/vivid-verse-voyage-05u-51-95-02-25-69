import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Info } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useProduct } from '@/hooks/useProduct';
import ProductSectionHeader from './ProductSectionHeader';

const ProductDescriptionSection = () => {
  const [showFullContent, setShowFullContent] = useState(false);
  
  const { id: paramId } = useParams<{ id: string }>();
  const { data: product } = useProduct(paramId || '');

  if (!product) return null;

  const productImages = [
    {
      type: 'main',
      caption: 'Product main features and quality',
      alt: 'Main product image'
    },
    {
      type: 'usage',
      caption: 'How to use it in daily work',
      alt: 'Product usage demonstration'
    },
    {
      type: 'quality',
      caption: 'Materials and premium quality',
      alt: 'Quality and materials details'
    },
    {
      type: 'community',
      caption: 'Perfect for your needs',
      alt: 'People using the product'
    }
  ];

  // Use real product images if available
  const productImageSources = product.product_images?.map(img => img.src) || [];
  const fallbackImages = [
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7'
  ];

  return (
    <div>
      <ProductSectionHeader
        title="Description"
        icon={BookOpen}
        rightContent={
          <div className="flex items-center text-xs text-[#FF4747] hover:text-red-600 cursor-pointer">
            <Info className="mr-1" size={12} />
            <span>See Full Description</span>
          </div>
        }
      />

      <div className="space-y-4">
        {/* Product Images and Text Combination */}
        <div className="space-y-4">
          {(showFullContent ? productImages : productImages.slice(0, 1)).map((image, index) => (
            <div key={index} className={`grid grid-cols-1 md:grid-cols-2 gap-4 items-center ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}>
              <div className={`${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                <div className="aspect-video bg-gray-100 rounded overflow-hidden">
                  <img 
                    src={
                      productImageSources[index] 
                        ? productImageSources[index]
                        : `${fallbackImages[index]}?auto=format&fit=crop&w=800&q=80`
                    }
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1 text-center">{image.caption}</p>
              </div>
              <div className={`${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                <div className="text-xs text-gray-700 leading-relaxed">
                  {index === 0 && (
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <p>{product.description || 'High-quality product designed with modern technology and durable materials. Built to last and provide excellent service.'}</p>
                    </div>
                  )}
                  {index === 1 && (
                    <div>
                      <h4 className="font-medium">Easy to Use</h4>
                      <p>Designed to be simple and intuitive for daily use. Perfect for work at home, office, and on the go.</p>
                    </div>
                  )}
                  {index === 2 && (
                    <div>
                      <h4 className="font-medium">Quality Materials</h4>
                      <p>We select high-quality materials that are durable and resistant to various conditions. Solid and reliable construction.</p>
                    </div>
                  )}
                  {index === 3 && (
                    <div>
                      <h4 className="font-medium">Customer Focused</h4>
                      <p>We understand customer needs and preferences. This product is adapted to provide the best user experience.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More/Less Button */}
        <div className="text-center pt-3">
          <button
            onClick={() => setShowFullContent(!showFullContent)}
            className="text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors flex items-center mx-auto"
          >
            <span>{showFullContent ? 'View Less' : 'View More'}</span>
            {showFullContent ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDescriptionSection;