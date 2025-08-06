
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, User, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function MobileBottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: Home,
    },
    {
      name: 'Browse',
      path: '/browse',
      icon: Search,
    },
    {
      name: 'Cart',
      path: '/cart',
      icon: ShoppingCart,
      badge: 2, // This would normally be dynamic from a cart context
    },
    {
      name: 'Wishlist',
      path: '/wishlist',
      icon: Heart,
    },
    {
      name: 'Account',
      path: '/account',
      icon: User,
    },
  ];

  // Animation variants
  const navBarVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1
      } 
    }
  };

  const iconVariants = {
    inactive: { scale: 1 },
    active: { 
      scale: [1, 1.2, 1],
      transition: { 
        duration: 0.3,
        times: [0, 0.5, 1]
      }
    }
  };

  const badgeVariants = {
    initial: { scale: 0 },
    animate: { 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={navBarVariants}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-14 z-40 px-1 shadow-lg"
    >
      <nav className="h-full">
        <ul className="flex items-center justify-between h-full">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            const IconComponent = item.icon;
            
            return (
              <li key={item.name} className="flex-1">
                <Link 
                  to={item.path} 
                  className="flex flex-col items-center justify-center h-full"
                >
                  <motion.div 
                    className="relative"
                    initial="inactive"
                    animate={isActive ? "active" : "inactive"}
                    variants={iconVariants}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconComponent 
                      className={cn(
                        "w-5 h-5 mb-1", 
                        isActive ? "text-red-500" : "text-gray-500"
                      )} 
                    />
                    {item.badge && (
                      <motion.span 
                        className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center"
                        initial="initial"
                        animate="animate"
                        variants={badgeVariants}
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </motion.div>
                  <motion.span 
                    className={cn(
                      "text-[10px]", 
                      isActive ? "text-red-500 font-medium" : "text-gray-500"
                    )}
                    animate={{
                      fontWeight: isActive ? 600 : 400,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {item.name}
                  </motion.span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.div>
  );
}
