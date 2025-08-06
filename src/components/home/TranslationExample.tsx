
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

export default function TranslationExample() {
  const { currentLanguage, t } = useLanguage();
  
  return (
    <div className="py-4 bg-white">
      <div className="container mx-auto px-3">
        <div className="max-w-2xl mx-auto bg-gray-50 p-4 rounded-lg">
          <h2 className="text-base font-bold mb-2">Translation Example</h2>
          <p className="text-sm text-gray-600 mb-3">
            This component shows how translations work. Current language: <span className="font-medium">{currentLanguage.name}</span>
          </p>
          
          <div className="space-y-2">
            <div className="bg-white p-2 rounded border">
              <div className="text-xs text-gray-500">Category names:</div>
              <ul className="text-sm">
                <li>{t('home.forYou')}</li>
                <li>{t('home.posts')}</li>
                <li>{t('home.messages')}</li>
                <li>{t('home.trending')}</li>
                <li>{t('home.videos')}</li>
              </ul>
            </div>
            
            <div className="bg-white p-2 rounded border">
              <div className="text-xs text-gray-500">Product actions:</div>
              <Button size="sm" className="mt-2 bg-orange-500 hover:bg-orange-600">
                {t('product.addToCart')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
