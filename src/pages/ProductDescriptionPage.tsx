import React, { useState } from 'react';
import { ChevronLeft, HelpCircle, Type, Palette, Sun, Moon, Search, ZoomIn, ZoomOut, Copy, Bookmark } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';

const ProductDescriptionPage = () => {
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState('light');
  const [showControls, setShowControls] = useState(false);

  const product = {
    name: "Premium Wireless Headphones",
    description: [
      {
        type: "text",
        content: "Experience crystal-clear sound with our premium wireless headphones. Featuring advanced noise cancellation technology, 30-hour battery life, and ultra-comfortable ear cushions designed for all-day wear."
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
        alt: "Premium headphones showcasing sleek design",
        caption: "Sleek and modern design with premium materials"
      },
      {
        type: "text",
        content: "Crafted with premium materials and engineered for exceptional audio quality, these headphones deliver deep bass, crisp highs, and balanced mids. Perfect for music lovers, professionals, and anyone seeking superior audio experience."
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop",
        alt: "Close-up of headphone padding and controls",
        caption: "Ultra-comfortable ear cushions with intuitive touch controls"
      },
      {
        type: "text",
        content: "The sleek design combines form and function, with intuitive touch controls and seamless Bluetooth connectivity. Whether you're commuting, working, or relaxing at home, these headphones provide an immersive audio experience that enhances every moment."
      },
      {
        type: "text",
        content: "Key Features:\n• Advanced noise cancellation technology\n• 30-hour battery life with quick charge\n• Premium comfort ear cushions\n• Intuitive touch controls\n• Seamless Bluetooth 5.0 connectivity\n• Professional-grade audio drivers\n• Foldable design for portability"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=400&fit=crop",
        alt: "Technical diagram showing headphone components",
        caption: "Advanced internal components and engineering"
      },
      {
        type: "text",
        content: "Technical Specifications:\n• Driver Size: 40mm dynamic drivers\n• Frequency Response: 20Hz - 20kHz\n• Impedance: 32 ohms\n• Weight: 250 grams\n• Charging Time: 2 hours\n• Connectivity: Bluetooth 5.0, USB-C\n• Noise Reduction: Up to 30dB"
      }
    ]
  };

  const handleBack = () => {
    console.log('Navigate back');
  };

  const handleHelp = () => {
    setShowControls(!showControls);
  };

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const getThemeClasses = () => {
    return theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-700';
  };

  const getHeaderClasses = () => {
    return theme === 'dark' ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-100';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getThemeClasses()}`}>
      {/* Clean header */}
      <div className={`sticky top-0 backdrop-blur-sm border-b z-50 transition-colors ${getHeaderClasses()}`}>
        <PageContainer padding="md" className="py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className={`p-2 hover:bg-opacity-10 hover:bg-gray-500 rounded-full transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="text-center">
              <h1 className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                Description
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Details about the product
              </p>
            </div>

            <button
              onClick={handleHelp}
              className={`p-2 hover:bg-opacity-10 hover:bg-gray-500 rounded-full transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
            >
              <HelpCircle className="h-5 w-5" />
            </button>
          </div>
        </PageContainer>

        {/* Collapsible controls panel */}
        {showControls && (
          <PageContainer padding="md" className={`pb-4 border-t border-opacity-10 border-gray-500 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50/50'}`}>
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-4">
                {/* Font size controls */}
                <div className="flex items-center gap-2">
                  <Type className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  <button
                    onClick={decreaseFontSize}
                    className={`px-3 py-1 text-sm rounded ${theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
                  >
                    A-
                  </button>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {fontSize}px
                  </span>
                  <button
                    onClick={increaseFontSize}
                    className={`px-3 py-1 text-sm rounded ${theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
                  >
                    A+
                  </button>
                </div>

                {/* Theme toggle */}
                <button
                  onClick={toggleTheme}
                  className={`flex items-center gap-2 px-3 py-1 text-sm rounded ${theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {theme === 'dark' ? 'Light' : 'Dark'}
                </button>
              </div>

              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Reading controls
              </div>
            </div>
          </PageContainer>
        )}
      </div>

      {/* Mixed content description */}
      <PageContainer padding="md" maxWidth="4xl" className="py-8 space-y-8">
        {product.description.map((item, index) => {
          if (item.type === 'text') {
            return (
              <div 
                key={index}
                className="leading-relaxed whitespace-pre-line transition-all duration-300"
                style={{ fontSize: `${fontSize}px`, lineHeight: '1.7' }}
              >
                {item.content}
              </div>
            );
          } else if (item.type === 'image') {
            return (
              <div key={index} className="space-y-4">
                <div className={`rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-auto object-cover"
                  />
                </div>
                {item.caption && (
                  <p className={`text-center text-sm italic ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.caption}
                  </p>
                )}
              </div>
            );
          }
          return null;
        })}

        {/* Reading info */}
        <div className={`mt-12 pt-6 border-t border-opacity-20 border-gray-500 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className="text-center">
            Reading time: ~{Math.ceil(product.description.filter(item => item.type === 'text').join(' ').split(/\s+/).length / 200)} minutes
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default ProductDescriptionPage;