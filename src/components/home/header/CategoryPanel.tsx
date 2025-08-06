
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ShoppingBag, Shirt, Bike, Coffee, Wrench, Gamepad2, Baby, Car, Tv, Menu } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface CategoryPanelProps {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (id: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  categories: string[];
  progress: number;
}

const CategoryPanel = ({ isOpen, activeTab, setActiveTab, setIsOpen, categories, progress }: CategoryPanelProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const popularCategories = [
    { id: 'fashion', name: t('categories.fashion'), icon: <Shirt className="h-4 w-4" /> },
    { id: 'sports', name: t('categories.sports'), icon: <Bike className="h-4 w-4" /> },
    { id: 'home', name: t('categories.home'), icon: <Coffee className="h-4 w-4" /> },
    { id: 'tools', name: t('categories.tools'), icon: <Wrench className="h-4 w-4" /> },
    { id: 'gaming', name: t('categories.gaming'), icon: <Gamepad2 className="h-4 w-4" /> },
    { id: 'baby', name: t('categories.baby'), icon: <Baby className="h-4 w-4" /> },
    { id: 'auto', name: t('categories.auto'), icon: <Car className="h-4 w-4" /> },
    { id: 'electronics', name: t('categories.electronics'), icon: <Tv className="h-4 w-4" /> },
    { id: 'all', name: t('categories.allCategories'), icon: <Menu className="h-4 w-4" /> },
  ];
  
  if (!isOpen) return null;
  
  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
    
    // Navigate based on the tab ID
    if (id === 'recommendations') navigate('/for-you');
    else if (id === 'posts') navigate('/posts');
    else if (id === 'shops') navigate('/shops');
    else if (id === 'trending') navigate('/trending');
    else if (id === 'videos') navigate('/videos');
  };

  return (
    <div 
      className="absolute w-full bg-white shadow-md z-20 overflow-hidden transition-all duration-300"
      style={{ 
        maxHeight: isOpen ? '400px' : '0',
        opacity: isOpen ? 1 : 0,
      }}
    >
      <div className="p-3 max-h-[calc(100vh-120px)] overflow-y-auto">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {popularCategories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => {
                setIsOpen(false);
                // Navigate to category page
                navigate(`/search?category=${cat.id}`);
              }}
              className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              <div className="p-1.5 bg-white rounded-full mb-2 shadow-sm">
                {cat.icon}
              </div>
              <span className="text-xs text-center">{cat.name}</span>
            </button>
          ))}
        </div>
        
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-1 uppercase font-medium">{t('categories.browseBy')}</div>
          <div className="grid grid-cols-2 gap-2">
            {categories.map(id => (
              <button
                key={id}
                className={`px-3 py-2 rounded-md text-sm text-left ${
                  activeTab === id ? "bg-orange-50 text-orange-600" : "hover:bg-gray-50"
                }`}
                onClick={() => handleTabClick(id)}
              >
                {id === 'recommendations' && t('home.forYou')}
                {id === 'posts' && t('home.posts')}
                {id === 'shops' && t('home.shops')}
                {id === 'trending' && t('home.trending')}
                {id === 'videos' && t('home.videos')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPanel;
