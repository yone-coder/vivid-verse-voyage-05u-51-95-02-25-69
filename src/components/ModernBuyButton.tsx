import React, { useState, useEffect } from 'react';
import { ShoppingCart, Clock, Check, ChevronDown, Star, Info, TrendingUp, Heart, ShieldCheck, ArrowRight, AlertTriangle, Plus, Minus, Truck, Gift, RefreshCw, Share2, Lock, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useProduct } from '@/hooks/useProduct';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from "sonner";

const ModernBuyButton = ({ productId }: { productId?: string }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [variantOpen, setVariantOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState('Red');
  const [timeLeft, setTimeLeft] = useState({ minutes: 3, seconds: 20, milliseconds: 0 });
  const [itemsInCart, setItemsInCart] = useState(0);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);
  const [showSocialProof, setShowSocialProof] = useState(true);
  const [currentSocialProofMessage, setCurrentSocialProofMessage] = useState('');
  const [pulseDiscount, setPulseDiscount] = useState(false);
  const [highlightStock, setHighlightStock] = useState(false);
  const [animatePrice, setAnimatePrice] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);
  const [showFeature, setShowFeature] = useState(0);
  const [shakeButton, setShakeButton] = useState(false);
  const [stockRemaining, setStockRemaining] = useState(100);
  const [basePrice, setBasePrice] = useState(49.99);
  const [priceIncrement, setPriceIncrement] = useState(0);
  const [showPriceIncrease, setShowPriceIncrease] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [stockProgressAnimation, setStockProgressAnimation] = useState(false);
  const [heartCount, setHeartCount] = useState(432);
  const [isHearted, setIsHearted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [showTooltip, setShowTooltip] = useState('');
  const [deliveryOptions, setDeliveryOptions] = useState(false);
  const [showInstantBuy, setShowInstantBuy] = useState(false);
  const [paymentExpanded, setPaymentExpanded] = useState(false);
  const [sparkleEffect, setSparkleEffect] = useState(false);
  const [bubbleEffects, setBubbleEffects] = useState<{x: number, y: number, size: number, duration: number}[]>([]);
  const [variantChangeAnimation, setVariantChangeAnimation] = useState(false);
  const [rotateIcons, setRotateIcons] = useState(false);
  const [wiggleQuantity, setWiggleQuantity] = useState(false);
  const [rainbowBorder, setRainbowBorder] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{id: number, x: number}[]>([]);
  const [bounceButton, setBounceButton] = useState(false);
  const { data: product } = useProduct(productId || '');

  const socialProofMessages = [
    "15 people bought this in the last hour!",
    "Someone from New York just purchased this.",
    "32 people are currently viewing this item.",
    "Back in stock! Limited quantity available.",
    "Hot right now! Selling 5x faster than usual.",
    "Only 2 left in stock - selling fast!",
    "Deal ends in 01:42:35 - don't miss out!",
    "Your size is almost gone!",
    "Next restock expected in 2 weeks.",
    "This item was sold out last week. Get it while you can!",
    "Rated 4.9/5 by 870 customers.",
    "\"Exactly what I needed!\" - James T.",
    "Over 3,000 people love this product.",
    "Top-rated in its category.",
    "\"Fast shipping and great quality!\" - Verified Buyer",
    "You've been looking at this for a while... ready to grab it?",
    "This item completes your vibe. Just sayin'.",
    "Seen on TikTok - going viral now!",
    "Buy now and get a surprise bonus!",
    "Cart's waiting... but this product won't!"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newMilliseconds = prev.milliseconds - 10;
        
        if (newMilliseconds < 0) {
          const newSeconds = prev.seconds - 1;
          
          if (newSeconds < 0) {
            const newMinutes = prev.minutes - 1;
            
            if (newMinutes < 0) {
              clearInterval(timer);
              return { minutes: 0, seconds: 0, milliseconds: 0 };
            }
            
            return { minutes: newMinutes, seconds: 59, milliseconds: 990 };
          }
          
          return { ...prev, seconds: newSeconds, milliseconds: 990 };
        }
        
        return { ...prev, milliseconds: newMilliseconds };
      });
    }, 10);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft.seconds === 0 && timeLeft.milliseconds === 0) {
      setHighlightStock(true);
      setWiggleQuantity(true);
      setTimeout(() => {
        setHighlightStock(false);
        setWiggleQuantity(false);
      }, 1000);
    }
  }, [timeLeft.seconds, timeLeft.milliseconds]);

  useEffect(() => {
    const socialProofTimer = setInterval(() => {
      const randomMessage = socialProofMessages[Math.floor(Math.random() * socialProofMessages.length)];
      
      // Create animation effect when message changes
      setShowSocialProof(false);
      setTimeout(() => {
        setCurrentSocialProofMessage(randomMessage);
        setShowSocialProof(true);
      }, 500);
      
    }, 8000);
    
    setCurrentSocialProofMessage(socialProofMessages[0]);
    
    return () => clearInterval(socialProofTimer);
  }, []);

  useEffect(() => {
    const discountInterval = setInterval(() => {
      setPulseDiscount(true);
      setRainbowBorder(true);
      setTimeout(() => {
        setPulseDiscount(false);
        setRainbowBorder(false);
      }, 2000);
    }, 10000);
    
    return () => clearInterval(discountInterval);
  }, []);

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setActiveFeature(prev => {
        const newValue = (prev + 1) % 5;
        setRotateIcons(true);
        setTimeout(() => setRotateIcons(false), 500);
        return newValue;
      });
    }, 3000);
    
    return () => clearInterval(featureInterval);
  }, []);

  useEffect(() => {
    const priceInterval = setInterval(() => {
      if (stockRemaining <= 70 && Math.random() > 0.5) {
        const increaseFactor = (100 - stockRemaining) / 100;
        const newIncrement = priceIncrement + parseFloat((Math.random() * 2 * increaseFactor).toFixed(2));
        setPriceIncrement(newIncrement);
        setAnimatePrice(true);
        setShowPriceIncrease(true);
        setBounceButton(true);
        setTimeout(() => {
          setAnimatePrice(false);
          setBounceButton(false);
          setTimeout(() => {
            setShowPriceIncrease(false);
          }, 3000);
        }, 1000);
      } else {
        setAnimatePrice(true);
        setTimeout(() => setAnimatePrice(false), 1000);
      }
    }, 15000);
    
    return () => clearInterval(priceInterval);
  }, [priceIncrement, stockRemaining]);

  useEffect(() => {
    const shakeInterval = setInterval(() => {
      if (!isHovering) {
        setShakeButton(true);
        setTimeout(() => setShakeButton(false), 800);
      }
    }, 20000);
    
    return () => clearInterval(shakeInterval);
  }, [isHovering]);

  useEffect(() => {
    const stockInterval = setInterval(() => {
      if (Math.random() > 0.6 && stockRemaining > 1) {
        const reduction = Math.floor(Math.random() * 3) + 1;
        setStockRemaining(prev => Math.max(1, prev - reduction));
        
        setStockProgressAnimation(true);
        setSparkleEffect(true);
        setTimeout(() => {
          setStockProgressAnimation(false);
          setSparkleEffect(false);
        }, 1000);
        
        setHighlightStock(true);
        setTimeout(() => setHighlightStock(false), 1000);
        
        if (stockRemaining < 50) {
          const priceIncrease = parseFloat((Math.random() * 0.5).toFixed(2));
          setPriceIncrement(prev => prev + priceIncrease);
          setAnimatePrice(true);
          setTimeout(() => setAnimatePrice(false), 1000);
        }
      }
    }, 10000);
    
    return () => clearInterval(stockInterval);
  }, [stockRemaining]);
  
  // Effect for floating icons animation
  useEffect(() => {
    const iconInterval = setInterval(() => {
      setRotateIcons(prev => !prev);
    }, 5000);
    
    return () => clearInterval(iconInterval);
  }, []);

  const addBubbleEffect = (x: number, y: number) => {
    const newBubble = {
      x: x + Math.random() * 20 - 10,
      y: y + Math.random() * 20 - 10,
      size: Math.random() * 10 + 5,
      duration: Math.random() * 2 + 1
    };
    
    setBubbleEffects(prev => [...prev, newBubble]);
    
    setTimeout(() => {
      setBubbleEffects(prev => prev.filter(b => b !== newBubble));
    }, newBubble.duration * 1000);
  };

  const handleBuyNow = () => {
    setShowAddedAnimation(true);
    setItemsInCart(prev => prev + quantity);
    if (stockRemaining >= quantity) {
      setStockRemaining(prev => prev - quantity);
      setStockProgressAnimation(true);
      setTimeout(() => setStockProgressAnimation(false), 1000);
    }
    
    // Add sparkle effect
    setSparkleEffect(true);
    setTimeout(() => setSparkleEffect(false), 2000);
    
    // Add multiple bubble effects
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        addBubbleEffect(Math.random() * 300, Math.random() * 100);
      }, i * 100);
    }
    
    toast.success("Item added to cart!", { 
      description: `${quantity} x ${selectedVariant} variant added`,
      duration: 3000
    });
    
    setTimeout(() => {
      setShowAddedAnimation(false);
    }, 1500);
  };

  const handleInstantBuy = () => {
    setShowAddedAnimation(true);
    setItemsInCart(prev => prev + quantity);
    if (stockRemaining >= quantity) {
      setStockRemaining(prev => prev - quantity);
    }
    
    // Add sparkle effect
    setSparkleEffect(true);
    setTimeout(() => setSparkleEffect(false), 2000);
    
    // Add multiple bubble effects
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        addBubbleEffect(Math.random() * 300, Math.random() * 100);
      }, i * 100);
    }
    
    toast.success("Express checkout initiated!", {
      description: `Processing ${quantity} x ${selectedVariant} for immediate purchase`,
      duration: 3000
    });
    
    setTimeout(() => {
      toast.info("Redirecting to payment...", {
        description: "You'll be redirected to complete your purchase"
      });
      setShowAddedAnimation(false);
    }, 1500);
  };

  const handleVariantChange = (variant: string) => {
    setSelectedVariant(variant);
    setVariantChangeAnimation(true);
    setTimeout(() => setVariantChangeAnimation(false), 1000);
    setVariantOpen(false);
  };

  const incrementQuantity = () => {
    if (quantity < stockRemaining && quantity < 10) {
      setQuantity(prev => prev + 1);
      setWiggleQuantity(true);
      setTimeout(() => setWiggleQuantity(false), 500);
      addBubbleEffect(250, 50);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      setWiggleQuantity(true);
      setTimeout(() => setWiggleQuantity(false), 500);
    }
  };

  const toggleHeart = () => {
    if (isHearted) {
      setHeartCount(prev => prev - 1);
    } else {
      setHeartCount(prev => prev + 1);
      setButtonHover(true);
      setTimeout(() => setButtonHover(false), 300);
      
      // Add floating hearts animation
      for (let i = 0; i < 5; i++) {
        const newHeart = {
          id: Date.now() + i,
          x: Math.random() * 30 - 15
        };
        
        setFloatingHearts(prev => [...prev, newHeart]);
        
        setTimeout(() => {
          setFloatingHearts(prev => prev.filter(h => h.id !== newHeart.id));
        }, 1500);
      }
    }
    setIsHearted(!isHearted);
  };

  const variants = ['Red', 'Blue', 'Black', 'Green'];
  const variantColors = {
    'Red': 'bg-red-500',
    'Blue': 'bg-blue-500',
    'Black': 'bg-black',
    'Green': 'bg-green-500'
  };

  const features = [
    { icon: <ShieldCheck size={12} />, text: "Guaranteed quality" },
    { icon: <TrendingUp size={12} />, text: "Trending now" },
    { icon: <Heart size={12} />, text: "Customer favorite" },
    { icon: <Truck size={12} />, text: "Free shipping" },
    { icon: <Lock size={12} />, text: "Secure checkout" }
  ];

  const deliveryFeatures = [
    { icon: <Truck size={12} />, text: "Standard (3-5 days)" },
    { icon: <Zap size={12} />, text: "Express (1-2 days)" }
  ];

  const stockPercentage = (stockRemaining / 100) * 100;
  
  const currentPrice = (basePrice + priceIncrement).toFixed(2);
  const totalPrice = (parseFloat(currentPrice) * quantity).toFixed(2);
  const discountPercentage = Math.round(((79.99 - parseFloat(currentPrice)) / 79.99) * 100);

  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };

  const formatMilliseconds = (ms) => {
    return Math.floor(ms / 10).toString().padStart(2, '0');
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this product',
        text: 'I found this amazing product you might like!',
        url: window.location.href,
      })
      .then(() => {
        toast.success("Shared successfully!");
        setSparkleEffect(true);
        setTimeout(() => setSparkleEffect(false), 1000);
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          toast.success("Link copied to clipboard!");
          setSparkleEffect(true);
          setTimeout(() => setSparkleEffect(false), 1000);
        })
        .catch(() => toast.error("Failed to copy link"));
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 font-sans">
      <div 
        className={`absolute -top-10 left-4 bg-white shadow-lg rounded-lg px-2 py-1 flex items-center space-x-2 
                   transition-all duration-500 ${showSocialProof ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
        style={{ animation: showSocialProof ? 'fadeIn 0.5s ease-out' : 'none' }}
      >
        <div className="flex -space-x-1 animate-pulse">
          <div className="w-4 h-4 rounded-full bg-gray-300 border-2 border-white animate-pulse"></div>
          <div className="w-4 h-4 rounded-full bg-gray-400 border-2 border-white animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-gray-500 border-2 border-white animate-pulse"></div>
        </div>
        <p className="text-xs font-medium text-gray-700">
          <span className="inline-flex items-center">
            <span className="animate-pulse text-red-500 mr-1">•</span>
            {currentSocialProofMessage}
          </span>
        </p>
      </div>
      
      {showPriceIncrease && (
        <div className="absolute -top-16 right-4 bg-amber-50 border border-amber-200 shadow-lg rounded-lg px-2 py-1 flex items-center space-x-2"
             style={{ animation: 'slideDown 0.3s ease-out, pulse 2s infinite' }}>
          <TrendingUp className="text-amber-500 animate-bounce" size={14} />
          <p className="text-xs font-medium text-amber-800 animate-pulse">
            Price increased due to high demand!
          </p>
        </div>
      )}
      
      {/* Sparkle effect */}
      {sparkleEffect && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                backgroundColor: ['#FFD700', '#FF6B6B', '#4CAF50', '#2196F3'][Math.floor(Math.random() * 4)],
                borderRadius: '50%',
                opacity: Math.random(),
                animationDuration: `${Math.random() * 2 + 0.5}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Bubble effects */}
      {bubbleEffects.map((bubble, i) => (
        <div 
          key={i}
          className="absolute pointer-events-none z-20"
          style={{
            left: `${bubble.x}px`,
            bottom: `${bubble.y}px`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            borderRadius: '50%',
            border: '2px solid #fff',
            opacity: 0,
            animation: `rise ${bubble.duration}s ease-out forwards`
          }}
        />
      ))}
      
      {/* Floating hearts */}
      {floatingHearts.map((heart) => (
        <div 
          key={heart.id}
          className="absolute pointer-events-none z-20"
          style={{
            right: '50px',
            bottom: '60px',
            transform: `translateX(${heart.x}px)`,
            animation: 'float 1.5s ease-out forwards'
          }}
        >
          <Heart fill="red" size={16} className="text-red-500" />
        </div>
      ))}
      
      {showAddedAnimation && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="animate-ping bg-green-500 p-4 rounded-full">
            <Check className="text-white animate-spin" size={24} />
          </div>
          <div className="absolute text-green-500 font-bold text-lg animate-bounce">
            Added to cart!
          </div>
        </div>
      )}
      
      <div 
        className={`relative bg-white shadow-lg border-t border-gray-200 ${rainbowBorder ? 'rainbow-border' : ''}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setVariantOpen(false);
          setDeliveryOptions(false);
          setPaymentExpanded(false);
        }}
      >
        <div className={`bg-red-50 py-0.5 px-3 border-t border-red-100 flex items-center justify-between ${highlightStock ? 'animate-pulse bg-red-100' : ''}`}>
          <div className="flex items-center">
            <AlertTriangle size={12} className="text-red-500 mr-1" />
            <span className={`text-xs font-bold text-red-700 ${highlightStock ? 'animate-bounce' : ''}`}>
              {stockRemaining <= 1 ? 'Last one available!' : `Only ${stockRemaining} left in stock!`}
            </span>
          </div>
          <div className={`text-xs text-red-600 ${pulseDiscount ? 'animate-pulse' : ''}`}>
            {stockRemaining <= 20 && "Prices may increase!"}
          </div>
        </div>
        
        <div className="h-0.5 w-full bg-gray-200">
          <div 
            className={`h-full ${stockRemaining <= 10 ? 'bg-red-500' : stockRemaining <= 30 ? 'bg-amber-500' : 'bg-green-500'} 
                      ${stockProgressAnimation ? 'animate-pulse' : ''} transition-all duration-1000 ease-in-out`}
            style={{ width: `${stockPercentage}%` }}
          ></div>
        </div>
        
        {isHovering && (
          <div 
            className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded-lg animate-bounce"
            style={{ animation: 'fadeIn 0.3s ease-in-out, bounce 1s infinite' }}
          >
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
            <span className="inline-flex items-center">
              Hurry! Almost gone!
            </span>
          </div>
        )}
        
        {variantOpen && (
          <div 
            className="absolute bottom-full mb-1 left-4 bg-white shadow-xl rounded-lg overflow-hidden w-32 z-10"
            style={{ animation: 'slideDown 0.2s ease-out' }}
          >
            {variants.map((variant, index) => (
              <div 
                key={variant}
                className="px-2 py-1.5 hover:bg-gray-100 cursor-pointer flex items-center space-x-2 transition-all duration-200 hover:translate-x-1"
                onClick={() => handleVariantChange(variant)}
              >
                <div className={`w-3 h-3 rounded-full ${variantColors[variant]} ${selectedVariant === variant ? 'animate-ping' : ''}`}></div>
                <span className="text-xs">{variant}</span>
                {selectedVariant === variant && 
                  <Check size={12} className="ml-auto text-green-500 animate-pulse" />
                }
              </div>
            ))}
          </div>
        )}
        
        {deliveryOptions && (
          <div 
            className="absolute bottom-full mb-1 left-20 bg-white shadow-xl rounded-lg overflow-hidden w-40 z-10"
            style={{ animation: 'slideDown 0.2s ease-out' }}
          >
            {deliveryFeatures.map((option, index) => (
              <div 
                key={index}
                className="px-2 py-1.5 hover:bg-gray-100 cursor-pointer flex items-center space-x-2 transition-all duration-200 hover:translate-x-1"
              >
                <div>
                  {option.icon}
                </div>
                <span className="text-xs">{option.text}</span>
                {index === 0 && <Check size={12} className="ml-auto text-green-500" />}
                {index === 1 && <span className="text-xs text-orange-500 ml-auto animate-pulse">+$4.99</span>}
              </div>
            ))}
          </div>
        )}
        
        <div className="flex flex-col px-3 py-1.5 bg-white">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <div className={`w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center relative overflow-hidden ${variantChangeAnimation ? 'animate-spin' : ''}`}>
                <div 
                  className={`absolute inset-1 rounded ${variantColors[selectedVariant]} ${variantChangeAnimation ? 'animate-pulse' : ''}`}
                ></div>
              </div>
              
              <div>
                <div className="flex items-center">
                  <span className={`font-bold text-sm ${animatePrice ? 'scale-up-down text-red-500' : ''}`}>
                    ${currentPrice}
                  </span>
                  <span className="text-xs text-gray-500 line-through ml-1">
                    $79.99
                  </span>
                  <span className={`text-xs text-red-500 ml-1 ${pulseDiscount ? 'animate-pulse font-bold' : ''}`}>
                    -{discountPercentage}%
                  </span>
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="ml-1" onClick={() => setShowPriceIncrease(true)}>
                          <Info size={10} className="text-gray-400" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        <p>Dynamic pricing based on demand</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star, i) => (
                    <Star 
                      key={star} 
                      fill={i < 4 ? "#FFD700" : "none"} 
                      color="#FFD700" 
                      size={8}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">1.2K</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={shareProduct}
                className="flex flex-col items-center justify-center relative overflow-hidden"
                aria-label="Share product"
              >
                <Share2 className="text-gray-400 hover:text-gray-600" size={14} />
              </button>
              
              <button 
                onClick={toggleHeart}
                className="flex flex-col items-center justify-center relative overflow-hidden"
              >
                <Heart 
                  className={`transition-all duration-300 ${isHearted ? 'text-red-500 fill-red-500 scale-110 animate-heartbeat' : 'text-gray-400'}`}
                  size={16}
                />
                <span className={`text-xs text-gray-500 mt-0.5 ${isHearted ? 'animate-pulse' : ''}`}>{heartCount}</span>
              </button>
            </div>
            
            <div className="relative">
              <div className="flex items-center space-x-1">
                <div className={`countdown-container ${timeLeft.minutes === 0 && timeLeft.seconds < 30 ? 'animate-pulse' : ''}`}>
                  <div className="countdown-unit">
                    <div className="countdown-value">{formatTime(timeLeft.minutes)}</div>
                    <div className="countdown-label">min</div>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-unit">
                    <div className="countdown-value">{formatTime(timeLeft.seconds)}</div>
                    <div className="countdown-label">sec</div>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-unit">
                    <div className="countdown-value milliseconds">{formatMilliseconds(timeLeft.milliseconds)}</div>
                    <div className="countdown-label">mil</div>
                  </div>
                </div>
              </div>
              <span className={`text-xs text-red-500 font-medium mt-0.5 block ${highlightStock ? 'animate-pulse' : ''}`}>
                {stockRemaining <= 1 ? 'Last one!' : `Only ${stockRemaining} left!`}
              </span>
              {itemsInCart > 0 && (
                <div 
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold shadow-md animate-bounce"
                >
                  {itemsInCart}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center mt-0.5 mb-0.5 justify-between">
            <div className="flex items-center text-xs text-gray-600">
              <div>
                {features[activeFeature].icon}
              </div>
              <span className="ml-1 text-[10px]">{features[activeFeature].text}</span>
            </div>
            
            <div className={`text-xs font-semibold text-red-500 mx-2 ${animatePrice ? 'animate-pulse' : ''}`}>
              Total: ${totalPrice}
            </div>
            
            <div className={`flex items-center text-xs bg-gray-100 rounded overflow-hidden ${wiggleQuantity ? 'animate-wiggle' : ''}`}>
              <button 
                onClick={decrementQuantity} 
                className="px-1 py-0.5 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition-colors duration-300"
                disabled={quantity <= 1}
              >
                <Minus size={10} />
              </button>
              <span className="px-1 font-medium">{quantity}</span>
              <button 
                onClick={incrementQuantity} 
                className="px-1 py-0.5 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition-colors duration-300"
                disabled={quantity >= stockRemaining || quantity >= 10}
              >
                <Plus size={10} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 justify-between">
            <div className="flex space-x-2">
              <div 
                className={`flex items-center space-x-1 cursor-pointer bg-gray-100 px-2 py-1 rounded-lg hover:bg-gray-200 transition-all duration-300 ${variantOpen ? 'animate-pulse' : ''}`} 
                onClick={(e) => {
                  e.stopPropagation();
                  setVariantOpen(!variantOpen);
                  setDeliveryOptions(false);
                }}
              >
                <div className={`w-2 h-2 rounded-full ${variantColors[selectedVariant]} ${variantChangeAnimation ? 'animate-ping' : ''}`} />
                <span className="text-xs">{selectedVariant}</span>
                <ChevronDown 
                  size={10} 
                  className={`transform transition-transform duration-300 ${variantOpen ? 'rotate-180 animate-bounce' : ''}`} 
                />
              </div>
              
              <div 
                className={`flex items-center space-x-1 cursor-pointer bg-gray-100 px-2 py-1 rounded-lg hover:bg-gray-200 transition-all duration-300 ${deliveryOptions ? 'animate-pulse' : ''}`} 
                onClick={(e) => {
                  e.stopPropagation();
                  setDeliveryOptions(!deliveryOptions);
                  setVariantOpen(false);
                }}
              >
                <Truck size={12} className="text-gray-500" />
                <span className="text-xs">Delivery</span>
                <ChevronDown 
                  size={10} 
                  className={`transform transition-transform duration-300 ${deliveryOptions ? 'rotate-180 animate-bounce' : ''}`} 
                />
              </div>
            </div>
            
            <button
              onClick={handleBuyNow}
              onMouseEnter={() => {
                setButtonHover(true);
                setTimeout(() => setShowInstantBuy(true), 300);
              }}
              onMouseLeave={() => {
                setButtonHover(false); 
                setTimeout(() => setShowInstantBuy(false), 500);
              }}
              className={`bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold py-1.5 px-4 rounded-lg flex-grow flex items-center justify-center space-x-1 transition-all duration-300 
                         ${buttonHover ? 'shadow-lg scale-105' : 'shadow-md'}
                         ${shakeButton ? 'animate-shake' : ''}
                         ${bounceButton ? 'animate-bounce' : ''}`}
              aria-label="Buy Now"
              style={{ 
                backgroundSize: buttonHover ? '200% 100%' : '100% 100%',
                backgroundPosition: buttonHover ? 'right center' : 'left center'
              }}
            >
              <ShoppingCart size={14} />
              <span className="text-sm">{buttonHover ? 'Buy Now!' : 'Buy Now'}</span>
              {buttonHover && <ArrowRight size={12} className="ml-1 animate-pulse" />}
            </button>
            
            {showInstantBuy && (
              <button
                onClick={handleInstantBuy}
                className="absolute right-0 -top-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-1.5 px-4 rounded-lg flex items-center justify-center space-x-1 transition-all duration-300 shadow-lg border border-amber-600 animate-bounce"
                style={{animation: "fadeIn 0.3s ease-out, pulse 2s infinite"}}
              >
                <Zap size={14} className="animate-pulse" />
                <span className="text-sm">Express Checkout</span>
              </button>
            )}
          </div>
        </div>
        
        <div className={`bg-gray-50 py-0.5 px-4 flex items-center justify-between border-t border-gray-200 ${rainbowBorder ? 'animate-pulse bg-gray-100' : ''}`}>
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-6 h-4 bg-white rounded flex items-center justify-center" style={{ border: "1px solid #ddd" }}>
                <img 
                  src="/lovable-uploads/f3efe2eb-c3db-48bd-abc7-c65456fdc028.png" 
                  alt="Visa" 
                  className="h-3 w-5 object-contain"
                />
              </div>
              <div className="w-6 h-4 bg-white rounded flex items-center justify-center" style={{ border: "1px solid #ddd" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="10">
                  <circle fill="#EA001B" cx="8" cy="12" r="5"/>
                  <circle fill="#F79E1B" cx="16" cy="12" r="5"/>
                  <path fill="#FF5F00" d="M12 7.5v9a5 5 0 0 0 0-9z"/>
                </svg>
              </div>
              <div className="w-6 h-4 bg-white rounded flex items-center justify-center" style={{ border: "1px solid #ddd" }}>
                <img 
                  src="/lovable-uploads/dd1cad7b-c3b6-43a6-9bc6-deb38a120604.png" 
                  alt="Venmo" 
                  className="h-3 w-5 object-contain"
                />
              </div>
              <div className="w-6 h-4 bg-white rounded flex items-center justify-center" style={{ border: "1px solid #ddd" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="10">
                  <path fill="#253B80" d="M7 7h2c1.4 0 1.9 1 1.9 1.5 0 1.8-2 1.8-2.5 1.8H7.3L7 7z"/>
                  <path fill="#179BD7" d="M19 7.8C18.7 5.8 16.9 5 14.7 5H9.2c-.3 0-.5.2-.6.5l-1.7 11c0 .2.1.4.4.4h2.9l.7-4.7v.3c.1-.3.3-.5.6-.5h1.3c2.5 0 4.4-1 5-3.9V8c-.1-.2-.1-.2-.1-.2H19z"/>
                  <path fill="#253B80" d="M8.3 11.5l-.3 2.1-.2 1h-3c-.2 0-.4-.2-.3-.4L6.1 5.9c.1-.3.3-.5.6-.5h5.5c1.5 0 2.6.3 3.2 1 .3.3.5.7.6 1.1.1.3.1.7.1 1.1-1-.6-2-.8-3.3-.8L8.3 11.5z"/>
                </svg>
              </div>
            </div>
            <span className="text-[10px] text-gray-500">Secure payment</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div 
              className="text-[10px] text-gray-500 flex items-center group transition-all duration-300 cursor-pointer"
              onClick={() => {
                toast.info("Free 30-day returns on all orders!", { 
                  description: "No questions asked return policy" 
                });
                setSparkleEffect(true);
                setTimeout(() => setSparkleEffect(false), 1000);
              }}
            >
              <RefreshCw size={8} className="mr-1 group-hover:animate-spin" />
              <span>30-day returns</span>
            </div>
            
            <div 
              className="text-[10px] text-gray-500 flex items-center group transition-all duration-300 cursor-pointer"
              onClick={() => {
                toast.info("Gift wrapping available", { 
                  description: "Add a personal touch to your gift" 
                });
                setSparkleEffect(true);
                setTimeout(() => setSparkleEffect(false), 1000);
              }}
            >
              <Gift size={8} className="mr-1 group-hover:animate-pulse" />
              <span>Gift options</span>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes scale-up-down {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          
          @keyframes heartbeat {
            0% { transform: scale(1); }
            25% { transform: scale(1.2); }
            50% { transform: scale(1); }
            75% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          
          @keyframes rise {
            0% { transform: translateY(0) scale(1); opacity: 0.7; }
            100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
          }
          
          @keyframes float {
            0% { transform: translateY(0) translateX(0); opacity: 1; }
            100% { transform: translateY(-50px) translateX(var(--float-x, 0)); opacity: 0; }
          }
          
          @keyframes colorChange {
            0% { border-color: #f87171; }
            25% { border-color: #fbbf24; }
            50% { border-color: #34d399; }
            75% { border-color: #60a5fa; }
            100% { border-color: #f87171; }
          }
          
          .scale-up-down {
            animation: scale-up-down 0.5s ease-in-out;
          }
          
          .animate-heartbeat {
            animation: heartbeat 1s ease-in-out;
          }
          
          .animate-wiggle {
            animation: wiggle 0.5s ease-in-out;
          }
          
          .rainbow-border {
            border-image: linear-gradient(45deg, #f87171, #fbbf24, #34d399, #60a5fa, #f87171) 1;
            animation: colorChange 2s linear infinite;
          }
          
          @keyframes wiggle {
            0%, 100% { transform: rotate(-1deg); }
            50% { transform: rotate(1deg); }
          }
          
          .countdown-container {
            display: flex;
            align-items: center;
            background: rgba(254, 226, 226, 0.4);
            border-radius: 4px;
            padding: 2px 4px;
            border: 1px solid rgba(239, 68, 68, 0.2);
          }

          .countdown-unit {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .countdown-value {
            font-family: monospace;
            font-weight: bold;
            font-size: 12px;
            color: #ef4444;
            min-width: 18px;
            text-align: center;
          }

          .countdown-value.milliseconds {
            font-size: 10px;
            color: #ef4444;
            width: 16px;
          }

          .countdown-label {
            font-size: 8px;
            color: #6b7280;
            text-transform: uppercase;
          }

          .countdown-separator {
            color: #ef4444;
            font-weight: bold;
            margin: 0 1px;
            font-size: 12px;
          }
        `}
      </style>
    </div>
  );
};

export default ModernBuyButton;
