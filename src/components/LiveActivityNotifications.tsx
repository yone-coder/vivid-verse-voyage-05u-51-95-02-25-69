import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart } from 'lucide-react';

const LiveActivityNotifications = () => {
  const [streamItems, setStreamItems] = useState([]);
  const containerRef = useRef(null);
  const addItemTimerRef = useRef(null);
  
  const users = [
    { username: "dance_queen22", color: "text-pink-500", location: "New York" },
    { username: "viral_guy", color: "text-blue-500", location: "Los Angeles" },
    { username: "tikfamous", color: "text-purple-500", location: "Miami" },
    { username: "comedy_central", color: "text-green-500", location: "Chicago" },
    { username: "music_lover99", color: "text-yellow-500", location: "Toronto" },
    { username: "trend_setter", color: "text-red-500", location: "London" },
    { username: "cool_vibes", color: "text-indigo-500", location: "Sydney" },
    { username: "just_watching", color: "text-orange-500", location: "Berlin" },
    { username: "first_timer", color: "text-teal-500", location: "Tokyo" },
    { username: "daily_poster", color: "text-cyan-500", location: "Paris" },
    { username: "sarah.j123", color: "text-pink-600", location: "Austin" },
    { username: "mike_outdoors", color: "text-green-600", location: "Denver" },
    { username: "fashionista2025", color: "text-purple-600", location: "Milan" },
    { username: "tech_geek42", color: "text-blue-600", location: "San Francisco" },
    { username: "fitness_freak", color: "text-orange-600", location: "Melbourne" },
    { username: "bookworm_emma", color: "text-yellow-600", location: "Seattle" },
    { username: "coffee_addict", color: "text-brown-500", location: "Portland" },
    { username: "night_owl88", color: "text-indigo-600", location: "Amsterdam" },
    { username: "travel_junkie", color: "text-teal-600", location: "Barcelona" },
    { username: "photo_pro", color: "text-cyan-600", location: "Singapore" }
  ];

  const generatePurchaseNotification = () => {
    return { 
      content: "Someone just bought this product",
      color: "text-green-500",
      bgColor: "bg-green-100/10",
      icon: ShoppingCart
    };
  };

  const createPurchaseNotification = () => {
    const notification = generatePurchaseNotification();
    
    return {
      id: Date.now() + Math.random(),
      itemType: "notification",
      content: notification.content,
      color: notification.color,
      bgColor: notification.bgColor,
      icon: notification.icon,
      opacity: 0,
      translateY: -20,
      scale: 0.95
    };
  };

  const addNewStreamItem = () => {
    const newItem = createPurchaseNotification();
    
    setStreamItems(prevItems => {
      let updatedItems = [newItem, ...prevItems];
      
      if (updatedItems.length > 2) {
        updatedItems = updatedItems.slice(0, 2);
      }
      
      return updatedItems;
    });
    
    setTimeout(() => {
      setStreamItems(prevItems => 
        prevItems.map(item => 
          item.id === newItem.id 
            ? { ...item, opacity: 1, translateY: 0, scale: 1 }
            : item
        )
      );
    }, 30);
    
    setTimeout(() => {
      setStreamItems(prevItems => 
        prevItems.map(item => 
          item.id === newItem.id 
            ? { ...item, opacity: 0, translateY: 20 }
            : item
        )
      );
      
      setTimeout(() => {
        setStreamItems(prevItems => 
          prevItems.filter(item => item.id !== newItem.id)
        );
      }, 400);
    }, 5000);
  };

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      addNewStreamItem();
    }, 1000);
    
    const intervalId = setInterval(() => {
      addNewStreamItem();
    }, 8000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
      if (addItemTimerRef.current) {
        clearTimeout(addItemTimerRef.current);
      }
    };
  }, []);

  const NotificationItem = ({ notification }) => {
    const IconComponent = notification.icon;
    
    return (
      <div 
        className="mb-2 transition-all duration-300 ease-in-out will-change-transform will-change-opacity"
        style={{ 
          opacity: notification.opacity,
          transform: `translateY(${notification.translateY}px) scale(${notification.scale})`,
          transformOrigin: 'center center'
        }}
      >
        <div className={`flex items-start px-3 py-2 bg-black/70 rounded-lg backdrop-blur-sm border-l-2 ${notification.color.replace('text', 'border')} max-w-[280px]`}>
          <IconComponent size={16} className={`${notification.color} mt-0.5 flex-shrink-0`} />
          <div className="ml-2 break-words">
            <span className="text-gray-200 text-xs leading-tight whitespace-normal">
              {notification.content}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="absolute z-20 bottom-24 left-2 flex flex-col-reverse space-y-reverse space-y-2 pointer-events-none">
      <div 
        ref={containerRef}
        className="overflow-y-auto max-h-[300px] flex flex-col-reverse"
      >
        {streamItems.map(item => (
          <div key={item.id}>
            <NotificationItem notification={item} />
          </div>
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes float-down {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
      `}} />
    </div>
  );
};

export default LiveActivityNotifications;
