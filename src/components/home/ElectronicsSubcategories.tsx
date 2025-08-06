import React, { useRef } from 'react';

// Category shortcut component
const CategoryShortcut = ({ category, navigate }) => {
  return (
    <div 
      className="flex flex-col items-center w-16 flex-shrink-0 active:opacity-80 transition-opacity touch-manipulation cursor-pointer"
      onClick={() => navigate(`/electronics/${category.id}`)}
    >
      <div className="relative w-14 h-14 rounded-lg overflow-hidden shadow-sm">
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-xs font-medium text-gray-700 text-center truncate w-full leading-snug mt-1">
        {category.name}
      </span>
    </div>
  );
};

const ElectronicsSubcategories = () => {
  const rowRef = useRef(null);

  // Mock navigate function
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  // Electronics subcategories data
  const electronicsCategories = [
    { 
      id: 'smartphones', 
      name: 'Smartphones', 
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=80&h=80&fit=crop&crop=center', 
      bgColor: 'bg-blue-100', 
      iconBg: 'bg-blue-500', 
      labelBg: 'bg-blue-600/90' 
    },
    { 
      id: 'laptops', 
      name: 'Laptops', 
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=80&h=80&fit=crop&crop=center', 
      bgColor: 'bg-gray-100', 
      iconBg: 'bg-gray-500', 
      labelBg: 'bg-gray-600/90' 
    },
    { 
      id: 'headphones', 
      name: 'Headphones', 
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop&crop=center', 
      bgColor: 'bg-purple-100', 
      iconBg: 'bg-purple-500', 
      labelBg: 'bg-purple-600/90' 
    },
    { 
      id: 'tablets', 
      name: 'Tablets', 
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=80&h=80&fit=crop&crop=center', 
      bgColor: 'bg-indigo-100', 
      iconBg: 'bg-indigo-500', 
      labelBg: 'bg-indigo-600/90' 
    },
    { 
      id: 'cameras', 
      name: 'Cameras', 
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=80&h=80&fit=crop&crop=center', 
      bgColor: 'bg-amber-100', 
      iconBg: 'bg-amber-500', 
      labelBg: 'bg-amber-600/90' 
    },
    { 
      id: 'smart-watches', 
      name: 'Smart Watches', 
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=80&h=80&fit=crop&crop=center', 
      bgColor: 'bg-green-100', 
      iconBg: 'bg-green-500', 
      labelBg: 'bg-green-600/90' 
    },
    { 
      id: 'gaming-consoles', 
      name: 'Gaming', 
      image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=80&h=80&fit=crop&crop=center', 
      bgColor: 'bg-red-100', 
      iconBg: 'bg-red-500', 
      labelBg: 'bg-red-600/90' 
    },
    { 
      id: 'tv-displays', 
      name: 'TVs & Displays', 
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=80&h=80&fit=crop&crop=center', 
      bgColor: 'bg-teal-100', 
      iconBg: 'bg-teal-500', 
      labelBg: 'bg-teal-600/90' 
    },
    { 
      id: 'accessories', 
      name: 'Accessories', 
      image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=80&h=80&fit=crop&crop=center', 
      bgColor: 'bg-orange-100', 
      iconBg: 'bg-orange-500', 
      labelBg: 'bg-orange-600/90' 
    },
    { 
      id: 'smart-home', 
      name: 'Smart Home', 
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=80&h=80&fit=crop&crop=center', 
      bgColor: 'bg-pink-100', 
      iconBg: 'bg-pink-500', 
      labelBg: 'bg-pink-600/90' 
    }
  ];

  return (
    <div className="w-full bg-white">
      <div className="py-3 bg-white">
        <div 
          ref={rowRef}
          className="flex overflow-x-auto pl-2 scrollbar-hide"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            scrollSnapType: 'x mandatory',
            scrollPaddingLeft: '8px'
          }}
        >
          {electronicsCategories.map(category => (
            <div 
              key={category.id}
              className="flex-shrink-0 mr-[3vw]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <CategoryShortcut category={category} navigate={navigate} />
            </div>
          ))}
          
          {/* Add right spacing for proper scrolling to the end */}
          <div className="flex-shrink-0 w-2"></div>
        </div>
      </div>
    </div>
  );
};

export default ElectronicsSubcategories;