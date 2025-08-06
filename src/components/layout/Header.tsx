import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Search, 
  ShoppingCart, 
  Camera, 
  Mic, 
  ChevronDown, 
  Heart,
  Menu,
  X,
  User,
  ChevronLeft,
  Share,
  MessageSquare,
  Bell,
  Home,
  Package,
  ShoppingBag,
  Zap,
  Settings,
  Globe,
  Headphones,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AliExpressLogo from "@/components/ui/AliExpressLogo";

const Header = ({ 
  isProductHeader, 
  isFavorite, 
  toggleFavorite, 
  handleShare,
  isSearchOpen,
  setIsSearchOpen,
  searchQuery,
  setSearchQuery,
  handleSearch
}: { 
  isProductHeader?: boolean, 
  isFavorite?: boolean, 
  toggleFavorite?: () => void, 
  handleShare?: () => void,
  isSearchOpen?: boolean,
  setIsSearchOpen?: (open: boolean) => void,
  searchQuery?: string,
  setSearchQuery?: (query: string) => void,
  handleSearch?: (e: React.FormEvent) => void
}) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [_searchQuery, _setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const categories = [
    { name: "Women's Fashion", icon: <ShoppingBag className="h-4 w-4" /> },
    { name: "Men's Fashion", icon: <Package className="h-4 w-4" /> },
    { name: "Electronics", icon: <Zap className="h-4 w-4" /> },
    { name: "Home & Garden", icon: <Home className="h-4 w-4" /> },
    { name: "Beauty & Health", icon: <Heart className="h-4 w-4" /> },
    { name: "Sports & Outdoors", icon: <Globe className="h-4 w-4" /> },
  ];

  // Use the props if provided, otherwise use internal state
  const actualSearchQuery = searchQuery !== undefined ? searchQuery : _searchQuery;
  const actualSetSearchQuery = setSearchQuery || _setSearchQuery;

  // Reimplement scroll behavior to switch header styles
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initialize on mount to ensure correct initial state
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (setIsSearchOpen) setIsSearchOpen(false);
    
    if (actualSearchQuery.trim()) {
      if (handleSearch) {
        handleSearch(e);
      } else {
        navigate(`/search?q=${encodeURIComponent(actualSearchQuery)}`);
      }
    }
  };

  const handleVoiceSearch = () => {
    toast({
      title: "Voice Search",
      description: "Voice search feature activated",
    });
  };

  const handleCameraSearch = () => {
    toast({
      title: "Camera Search",
      description: "Camera search feature activated",
    });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast({
      title: "Login Successful",
      description: "You have been logged in successfully",
      variant: "success",
    });
  };

  if (isProductHeader) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className={`h-[44px] w-full transition-all duration-200 ${isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
          {isScrolled ? (
            // Scrolled Product Header with search bar instead of title
            <div className="flex items-center justify-between h-full px-3 pointer-events-auto">
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0" asChild>
                <Link to="/">
                  <ChevronLeft className="h-4 w-4" />
                </Link>
              </Button>
              
              <div className="flex-1 mx-2">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="h-7 pl-7 pr-3 text-[10px] rounded-full"
                    value={actualSearchQuery}
                    onChange={(e) => actualSetSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500" />
                </form>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0" onClick={toggleFavorite}>
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0" onClick={handleShare}>
                  <Share className="h-4 w-4" />
                </Button>
                <div className="relative">
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-0" onClick={() => navigate('/cart')}>
                    <ShoppingCart className="h-4 w-4" />
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[8px] rounded-full h-3 w-3 flex items-center justify-center">
                      {cartCount}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Transparent Product Header for hero image
            <div className="absolute top-2 left-0 right-0 flex justify-between z-10 px-3 pointer-events-auto">
              <Button variant="outline" size="icon" className="h-8 w-8 p-0 rounded-full bg-black/40 backdrop-blur-sm border-0 text-white" asChild>
                <Link to="/">
                  <ChevronLeft className="h-4 w-4" />
                </Link>
              </Button>
              
              <div className="flex-1 mx-3 relative hidden md:block">
                <div className="relative w-full max-w-[300px] mx-auto">
                  <Input 
                    type="text" 
                    placeholder="Search products..." 
                    className="h-7 pl-7 pr-7 bg-black/30 backdrop-blur-sm hover:bg-black/40 text-[10px] rounded-full border-0 text-white placeholder:text-gray-300"
                    value={actualSearchQuery}
                    onChange={(e) => actualSetSearchQuery(e.target.value)}
                    onKeyUp={(e) => {
                      if (e.key === 'Enter') {
                        handleSearchSubmit(e as unknown as React.FormEvent);
                      }
                    }}
                  />
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-300" />
                  <Camera className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-300" />
                </div>
              </div>
              
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 p-0 rounded-full bg-black/40 backdrop-blur-sm border-0 text-white"
                  onClick={toggleFavorite}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-white text-white" : ""}`} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 p-0 rounded-full bg-black/40 backdrop-blur-sm border-0 text-white"
                  onClick={handleShare}
                >
                  <Share className="h-4 w-4" />
                </Button>
                <div className="relative">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 p-0 rounded-full bg-black/40 backdrop-blur-sm border-0 text-white"
                    onClick={() => navigate('/cart')}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[8px] rounded-full h-3 w-3 flex items-center justify-center">
                      {cartCount}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Regular home header
  return (
    <div className="sticky top-0 left-0 right-0 bg-white z-40">
      {/* Main Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="py-2 px-3">
          {/* Main Search Bar */}
          <div className="flex items-center">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80%] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        {isLoggedIn ? (
                          <Avatar>
                            <AvatarFallback className="bg-orange-500 text-white">JD</AvatarFallback>
                          </Avatar>
                        ) : (
                          <User className="h-6 w-6 text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        {isLoggedIn ? (
                          <div className="space-y-1">
                            <p className="text-sm font-medium">John Doe</p>
                            <p className="text-xs text-gray-500">john.doe@example.com</p>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <Button variant="default" size="sm" className="h-7 text-[10px] bg-red-500 hover:bg-red-600" onClick={handleLogin}>Sign In</Button>
                            <Button variant="outline" size="sm" className="h-7 text-[10px]">Register</Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="overflow-auto flex-1">
                    <div className="p-3">
                      <div className="grid grid-cols-4 gap-3 mb-4">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-1">
                            <Heart className="h-5 w-5 text-red-500" />
                          </div>
                          <span className="text-[10px]">Wishlist</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mb-1">
                            <ShoppingCart className="h-5 w-5 text-orange-500" />
                          </div>
                          <span className="text-[10px]">Cart</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-1">
                            <MessageSquare className="h-5 w-5 text-blue-500" />
                          </div>
                          <span className="text-[10px]">Messages</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-1">
                            <Bell className="h-5 w-5 text-purple-500" />
                          </div>
                          <span className="text-[10px]">Alerts</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 space-y-3">
                        <div className="text-sm font-medium">Categories</div>
                        {categories.map((category, idx) => (
                          <div key={idx} className="py-2 border-b border-gray-100">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                {category.icon}
                                <span className="text-xs">{category.name}</span>
                              </div>
                              <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6">
                        <div className="text-sm font-medium mb-3">Account</div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Settings className="h-4 w-4 text-gray-500" />
                            <span className="text-xs">Settings</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Headphones className="h-4 w-4 text-gray-500" />
                            <span className="text-xs">Help Center</span>
                          </div>
                          {isLoggedIn && (
                            <div className="flex items-center gap-2" onClick={() => setIsLoggedIn(false)}>
                              <LogIn className="h-4 w-4 text-gray-500" />
                              <span className="text-xs">Log Out</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <div className="flex-1 relative" onClick={() => navigate('/search')}>
              <div className="bg-gray-100 rounded-full h-8 px-3 py-1.5 flex items-center">
                <Search className="h-3.5 w-3.5 text-gray-400 mr-2" />
                <span className="text-[11px] text-gray-500">Search on AliExpress</span>
              </div>
            </div>
            
            <div className="flex items-center ml-2 gap-2">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => navigate('/search')}>
                <Camera className="h-5 w-5" />
              </Button>
              
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <ShoppingCart className="h-5 w-5" />
                      <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-3">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">Shopping Cart ({cartCount})</h3>
                      <Button variant="link" size="sm" className="text-[10px] text-orange-500 h-auto p-0">View All</Button>
                    </div>
                    
                    {cartCount > 0 ? (
                      <div className="space-y-2">
                        {[...Array(cartCount)].map((_, idx) => (
                          <div key={idx} className="flex gap-2 p-2 rounded-md hover:bg-gray-50">
                            <div className="w-12 h-12 bg-gray-100 rounded-md shrink-0">
                              <img 
                                src={`https://picsum.photos/200/200?random=${idx + 1}`} 
                                className="w-full h-full object-cover rounded-md"
                                alt="Product"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-medium truncate">Wireless Earbuds with Noise Cancellation</p>
                              <div className="flex justify-between mt-1">
                                <p className="text-xs text-red-500">$19.99</p>
                                <p className="text-[10px] text-gray-500">Qty: 1</p>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <div className="pt-2 border-t mt-2">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-xs">Subtotal:</span>
                            <span className="text-xs font-medium">$39.98</span>
                          </div>
                          <Button className="w-full text-xs bg-red-500 hover:bg-red-600">
                            Checkout Now
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <ShoppingCart className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-xs text-gray-500">Your cart is empty</p>
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              
              {!isMobile && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      {isLoggedIn ? (
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="bg-orange-500 text-white text-[10px]">JD</AvatarFallback>
                        </Avatar>
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-3">
                    {isLoggedIn ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-orange-500 text-white">JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">John Doe</p>
                            <p className="text-xs text-gray-500">john.doe@example.com</p>
                          </div>
                        </div>
                        
                        <div className="pt-2 border-t space-y-2">
                          <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8">
                            <User className="h-3.5 w-3.5 mr-2" />
                            My Account
                          </Button>
                          <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8">
                            <ShoppingBag className="h-3.5 w-3.5 mr-2" />
                            My Orders
                          </Button>
                          <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8">
                            <Heart className="h-3.5 w-3.5 mr-2" />
                            My Wishlist
                          </Button>
                          <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8" onClick={() => setIsLoggedIn(false)}>
                            <LogIn className="h-3.5 w-3.5 mr-2" />
                            Log Out
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="text-center mb-2">
                          <p className="text-sm font-medium mb-1">Sign in to your account</p>
                          <p className="text-xs text-gray-500">Access your orders, wishlist and more</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Button className="w-full text-xs bg-red-500 hover:bg-red-600" onClick={handleLogin}>
                            Sign In
                          </Button>
                          <Button variant="outline" className="w-full text-xs">
                            Register
                          </Button>
                        </div>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
          
          {/* Categories Scroller */}
          <div className="mt-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center space-x-3 whitespace-nowrap pb-1">
              <div className="flex flex-col items-center">
                <Badge variant="aliSuper" className="text-[8px] px-2 py-0.5 rounded-sm">SUPER DEALS</Badge>
                <AliExpressLogo className="w-5 h-5" width={24} height={24} />
              </div>
              <div className="text-[10px]">Flash Deals</div>
              <div className="text-[10px]">Top Selection</div>
              <div className="text-[10px]">New Arrivals</div>
              <div className="text-[10px]">Clearance</div>
              <div className="text-[10px]">Free Shipping</div>
              <div className="text-[10px]">Trending</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="p-3 border-b">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="h-8 w-8 mr-2" onClick={() => setIsSearchOpen && setIsSearchOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
              
              <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search on AliExpress"
                    className="h-9 pl-8 pr-8 rounded-full border-gray-200 text-xs"
                    value={actualSearchQuery}
                    onChange={(e) => actualSetSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  {actualSearchQuery && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                      onClick={() => actualSetSearchQuery("")}
                    >
                      <X className="h-3 w-3 text-gray-400" />
                    </Button>
                  )}
                </div>
                <Button type="submit" className="ml-2 bg-red-500 hover:bg-red-600 h-9 px-3 rounded-full text-xs">
                  Search
                </Button>
              </form>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="h-7 rounded-full text-[10px] flex gap-1" onClick={handleCameraSearch}>
                  <Camera className="h-3 w-3" />
                  <span>Camera</span>
                </Button>
                <Button variant="outline" size="sm" className="h-7 rounded-full text-[10px] flex gap-1" onClick={handleVoiceSearch}>
                  <Mic className="h-3 w-3" />
                  <span>Voice</span>
                </Button>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 text-[10px]">
                    English
                    <ChevronDown className="h-3 w-3 ml-0.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-xs">English</DropdownMenuItem>
                  <DropdownMenuItem className="text-xs">Español</DropdownMenuItem>
                  <DropdownMenuItem className="text-xs">Français</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="p-3">
            <Tabs defaultValue="recent" className="mb-4">
              <TabsList className="w-full grid grid-cols-3 h-8">
                <TabsTrigger value="recent" className="text-[10px]">Recent Searches</TabsTrigger>
                <TabsTrigger value="popular" className="text-[10px]">Popular</TabsTrigger>
                <TabsTrigger value="trending" className="text-[10px]">Trending</TabsTrigger>
              </TabsList>
              <TabsContent value="recent" className="mt-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-600 border-0 text-[10px]">iphone 15 case</Badge>
                  <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-600 border-0 text-[10px]">wireless earbuds</Badge>
                  <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-600 border-0 text-[10px]">smart watch</Badge>
                </div>
              </TabsContent>
              <TabsContent value="popular" className="mt-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-600 border-0 text-[10px]">summer dress</Badge>
                  <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-600 border-0 text-[10px]">phone charger</Badge>
                  <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-600 border-0 text-[10px]">bluetooth speaker</Badge>
                  <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-600 border-0 text-[10px]">men's shoes</Badge>
                </div>
              </TabsContent>
              <TabsContent value="trending" className="mt-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-600 border-0 text-[10px]">led lights</Badge>
                  <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-600 border-0 text-[10px]">water bottle</Badge>
                  <Badge className="bg-gray-100 hover:bg-gray-200 text-gray-600 border-0 text-[10px]">laptop sleeve</Badge>
                </div>
              </TabsContent>
            </Tabs>
            
            <div>
              <h3 className="text-xs font-medium mb-2">Trending Products</h3>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex flex-col">
                    <div className="relative">
                      <img
                        src={`https://picsum.photos/200/200?random=${item}`}
                        alt="Product"
                        className="rounded-md w-full aspect-square object-cover"
                      />
                      <Badge className="absolute bottom-1 left-1 bg-red-500 text-[8px] px-1.5">-20%</Badge>
                    </div>
                    <p className="text-[10px] mt-1 truncate">Trendy Product Item with Long Name</p>
                    <p className="text-[10px] text-red-500 font-medium">$19.99</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
