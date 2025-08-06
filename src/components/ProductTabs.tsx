import React, { useRef, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp, ThumbsDown, Award, Package, CheckCircle, Award as AwardIcon, Heart, ShoppingBag, ChevronRight, ChevronDown } from "lucide-react";

interface ProductSpec {
  name: string;
  value: string;
}

interface ProductProps {
  id: string;
  name: string;
  price: number;
  discountPrice: number;
  rating: number;
  reviewCount: number;
  sold: number;
  description: string;
  images: string[];
  specs: ProductSpec[];
}

interface ProductTabsProps {
  product: ProductProps;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isScrolled: boolean;
  headerHeight: number;
  previewMode?: boolean;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  product,
  activeTab,
  setActiveTab,
  isScrolled,
  headerHeight,
  previewMode = false
}) => {
  const [expandedTabs, setExpandedTabs] = useState<Record<string, boolean>>({});
  const tabsContentRef = useRef<HTMLDivElement>(null);
  const tabContentsRefs = {
    description: useRef<HTMLDivElement>(null),
    specs: useRef<HTMLDivElement>(null),
    reviews: useRef<HTMLDivElement>(null)
  };

  useEffect(() => {
    const activeTabRef = tabContentsRefs[activeTab as keyof typeof tabContentsRefs];
    if (activeTabRef && activeTabRef.current) {
      activeTabRef.current.scrollTop = 0;
      
      if (tabsContentRef.current) {
        tabsContentRef.current.scrollTop = 0;
      }
    }
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const toggleTabExpand = (tabId: string) => {
    setExpandedTabs(prev => ({
      ...prev,
      [tabId]: !prev[tabId]
    }));
  };

  const isTabExpanded = (tabId: string) => expandedTabs[tabId] || false;

  const getPreviewLimit = (tabId: string) => {
    switch(tabId) {
      case "description": return 1; // Show only first image
      case "specs": return 3; // Show first 3 specs
      case "reviews": return 1; // Show first review
      default: return 2;
    }
  };

  if (!previewMode && !activeTab) {
    return null;
  }

  return (
    <Tabs 
      value={activeTab || "description"} 
      onValueChange={handleTabChange}
      className="w-full"
    >
      {!previewMode && activeTab && (
        <div className={`bg-white sticky z-20`} style={{ top: `${headerHeight}px` }}>
          <ScrollArea className="w-full" orientation="horizontal">
            <TabsList className="w-full h-10 bg-white px-0 justify-start">
              <TabsTrigger 
                value="description" 
                className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none rounded-none text-sm"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="specs" 
                className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none rounded-none text-sm"
              >
                Specs
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none rounded-none text-sm"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
          </ScrollArea>
        </div>
      )}

      <div ref={tabsContentRef} className="overflow-auto">
        {((previewMode && (!activeTab || activeTab === "")) || activeTab === "description") && (
          <TabsContent value="description" className="mt-0">
            <div ref={tabContentsRefs.description} className="overflow-auto">
              <Card className="border-0 shadow-none">
                <CardContent className="p-0">
                  <div className="flex flex-col space-y-2">
                    {product.images.slice(0, isTabExpanded("description") ? product.images.length : getPreviewLimit("description")).map((image, index) => (
                      <img 
                        key={index} 
                        src={image || "/placeholder.svg"} 
                        alt={`Product detail ${index + 1}`} 
                        className="w-full h-auto object-cover" 
                      />
                    ))}
                    
                    {isTabExpanded("description") && product.images.length < 5 && (
                      <>
                        <img src="/placeholder.svg" alt="Product feature" className="w-full h-auto object-cover" />
                        <img src="/placeholder.svg" alt="Product feature" className="w-full h-auto object-cover" />
                        <img src="/placeholder.svg" alt="Product feature" className="w-full h-auto object-cover" />
                      </>
                    )}
                    
                    {previewMode && !isTabExpanded("description") && (
                      <div className="p-4">
                        <Button 
                          onClick={() => toggleTabExpand("description")} 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2 text-red-500 border-red-500"
                        >
                          View More <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    
                    {previewMode && isTabExpanded("description") && (
                      <div className="p-4">
                        <Button 
                          onClick={() => toggleTabExpand("description")} 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2 text-red-500 border-red-500"
                        >
                          Show Less <ChevronDown className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}

        {((previewMode && (!activeTab || activeTab === "")) || activeTab === "specs") && (
          <TabsContent value="specs" className="mt-0">
            <div ref={tabContentsRefs.specs} className="overflow-auto">
              <Card className="border-0 shadow-none">
                <CardContent className="p-4">
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h3 className="text-base font-medium text-blue-800 mb-1">Technical Specifications</h3>
                    <p className="text-sm text-blue-700">Detailed specifications of the Galaxy Nebula Projector Pro 2025</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex mb-2 items-center">
                      <Package className="h-4 w-4 text-purple-600 mr-2" />
                      <h3 className="font-medium">Physical Specifications</h3>
                    </div>
                    <div className="bg-gray-50 rounded-lg overflow-hidden">
                      <div className="divide-y">
                        {product.specs.slice(0, isTabExpanded("specs") ? product.specs.length : getPreviewLimit("specs")).map((spec, index) => (
                          <div key={index} className="py-3 px-4 flex hover:bg-gray-100 transition-colors">
                            <span className="w-1/3 text-gray-500 text-sm">{spec.name}</span>
                            <span className="w-2/3 font-medium text-sm">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {isTabExpanded("specs") && (
                    <>
                      <div className="mb-4">
                        <div className="flex mb-2 items-center">
                          <Star className="h-4 w-4 text-purple-600 mr-2" />
                          <h3 className="font-medium">Performance</h3>
                        </div>
                        <div className="bg-gray-50 rounded-lg overflow-hidden">
                          <div className="divide-y">
                            {product.specs.slice(3, 8).map((spec, index) => (
                              <div key={index} className="py-3 px-4 flex hover:bg-gray-100 transition-colors">
                                <span className="w-1/3 text-gray-500 text-sm">{spec.name}</span>
                                <span className="w-2/3 font-medium text-sm">{spec.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex mb-2 items-center">
                          <ShoppingBag className="h-4 w-4 text-purple-600 mr-2" />
                          <h3 className="font-medium">Package Details</h3>
                        </div>
                        <div className="bg-gray-50 rounded-lg overflow-hidden">
                          <div className="divide-y">
                            {product.specs.slice(8).map((spec, index) => (
                              <div key={index} className="py-3 px-4 flex hover:bg-gray-100 transition-colors">
                                <span className="w-1/3 text-gray-500 text-sm">{spec.name}</span>
                                <span className="w-2/3 font-medium text-sm">{spec.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {previewMode && !isTabExpanded("specs") && (
                    <Button 
                      onClick={() => toggleTabExpand("specs")} 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2 text-red-500 border-red-500 mt-2"
                    >
                      View More <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                  
                  {previewMode && isTabExpanded("specs") && (
                    <Button 
                      onClick={() => toggleTabExpand("specs")} 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2 text-red-500 border-red-500 mt-2"
                    >
                      Show Less <ChevronDown className="h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}

        {((previewMode && (!activeTab || activeTab === "")) || activeTab === "reviews") && (
          <TabsContent value="reviews" className="mt-0">
            <div ref={tabContentsRefs.reviews} className="overflow-auto">
              <Card className="border-0 shadow-none">
                <CardContent className="p-4">
                  {isTabExpanded("reviews") ? (
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                      <div className="md:w-1/3 bg-gray-50 p-4 rounded-lg">
                        <div className="flex flex-col items-center">
                          <div className="text-4xl font-bold text-purple-700">{product.rating}</div>
                          <div className="text-amber-400 flex mb-1">
                            {'★'.repeat(Math.floor(product.rating))}
                            {product.rating % 1 !== 0 && '☆'}
                            {'☆'.repeat(5 - Math.ceil(product.rating))}
                          </div>
                          <div className="text-sm text-gray-500">{product.reviewCount} verified ratings</div>
                          
                          <div className="w-full mt-4 space-y-2">
                            <div className="flex items-center text-sm">
                              <span className="w-12">5 ★</span>
                              <Progress value={85} className="h-2 flex-1 mx-2" />
                              <span className="w-8 text-right">85%</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <span className="w-12">4 ★</span>
                              <Progress value={12} className="h-2 flex-1 mx-2" />
                              <span className="w-8 text-right">12%</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <span className="w-12">3 ★</span>
                              <Progress value={2} className="h-2 flex-1 mx-2" />
                              <span className="w-8 text-right">2%</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <span className="w-12">2 ★</span>
                              <Progress value={1} className="h-2 flex-1 mx-2" />
                              <span className="w-8 text-right">1%</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <span className="w-12">1 ★</span>
                              <Progress value={0} className="h-2 flex-1 mx-2" />
                              <span className="w-8 text-right">0%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h3 className="font-medium text-sm mb-2">Review Highlights</h3>
                          <div className="flex flex-wrap gap-1.5">
                            <Badge variant="secondary" className="bg-purple-100 hover:bg-purple-200 text-purple-800">Amazing colors (342)</Badge>
                            <Badge variant="secondary" className="bg-purple-100 hover:bg-purple-200 text-purple-800">Easy setup (286)</Badge>
                            <Badge variant="secondary" className="bg-purple-100 hover:bg-purple-200 text-purple-800">Great gift (215)</Badge>
                            <Badge variant="secondary" className="bg-purple-100 hover:bg-purple-200 text-purple-800">Battery life (198)</Badge>
                            <Badge variant="secondary" className="bg-purple-100 hover:bg-purple-200 text-purple-800">Beautiful projection (187)</Badge>
                          </div>
                        </div>
                        
                        <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                          Write a Review
                        </Button>
                      </div>
                      
                      <div className="md:w-2/3">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">Customer Reviews</h3>
                          <select className="text-xs border rounded p-1.5">
                            <option>Most Recent</option>
                            <option>Highest Rated</option>
                            <option>Lowest Rated</option>
                            <option>Most Helpful</option>
                          </select>
                        </div>
                        
                        <div className="space-y-4">
                          {[...Array(5)].map((_, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium mr-3">
                                  {["JS", "AK", "LM", "RW", "TP"][index]}
                                </div>
                                <div>
                                  <div className="font-medium">{["John S.", "Alyssa K.", "Lisa M.", "Robert W.", "Thomas P."][index]}</div>
                                  <div className="text-xs text-gray-500">
                                    {new Date(Date.now() - index * 5 * 86400000).toLocaleDateString()}
                                  </div>
                                </div>
                                <div className="ml-auto text-xs flex items-center">
                                  <Badge variant="outline" className="mr-2 border-purple-200 text-purple-700 font-normal">
                                    Verified Purchase
                                  </Badge>
                                  <Badge variant={index === 1 ? "outline" : "secondary"} className={index === 1 ? "border-green-200 text-green-700 font-normal" : "bg-green-100 text-green-700 font-normal"}>
                                    {["Top 100", "Early Adopter", "Trusted Reviewer", "Pro User", "Top Contributor"][index]}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="mt-2">
                                <div className="flex justify-between items-center">
                                  <div className="text-amber-400 text-sm">
                                    {'★'.repeat(5 - Math.min(2, index))}
                                    {'☆'.repeat(Math.min(2, index))}
                                  </div>
                                  <div className="text-sm font-medium">
                                    {["Breathtaking Galaxy Experience", "Beautiful Colors, Poor Battery", "Perfect Gift for Space Lovers", "Absolutely Love It", "Great Value"][index]}
                                  </div>
                                </div>
                                
                                <p className="mt-2 text-sm text-gray-700">
                                  {index === 0 && "This nebula projector exceeded my expectations! The colors are vibrant and realistic, truly creating an immersive galaxy experience in my bedroom. The remote makes it easy to change projection modes and the bluetooth speaker is an awesome bonus feature."}
                                  {index === 1 && "The color projection is absolutely stunning - blues, purples, and pinks blend so naturally. My only complaint is the battery life is about 4 hours instead of the advertised 6. Still a great purchase overall."}
                                  {index === 2 && "Bought this for my space-obsessed nephew and he absolutely loves it! The projection quality is excellent and the setup was super simple. Great quality for the price."}
                                  {index === 3 && "I use this every night now - the sleep timer function is perfect and the projections are so relaxing. App connection was a bit tricky at first but works great now."}
                                  {index === 4 && "Impressive quality for the price point. The projection is bright enough for a medium-sized room and the different modes give plenty of variety. Highly recommend!"}
                                </p>
                                
                                {index < 2 && (
                                  <div className="mt-3 flex gap-2 overflow-x-auto">
                                    {[...Array(index === 0 ? 3 : 2)].map((_, imgIndex) => (
                                      <img key={imgIndex} src="/placeholder.svg" alt="Review" className="w-16 h-16 object-cover rounded" />
                                    ))}
                                  </div>
                                )}
                                
                                <div className="mt-3 flex items-center justify-between">
                                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                                    <button className="flex items-center hover:text-gray-700">
                                      <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                                      Helpful ({[24, 18, 12, 8, 5][index]})
                                    </button>
                                    <button className="flex items-center hover:text-gray-700">
                                      <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                                      Not helpful ({[1, 3, 0, 1, 0][index]})
                                    </button>
                                  </div>
                                  <button className="text-xs text-blue-600 hover:underline">Report</button>
                                </div>
                                
                                {index === 1 && (
                                  <div className="mt-3 border-t pt-3">
                                    <div className="flex items-start">
                                      <Badge variant="outline" className="mr-2 border-red-200 bg-red-50 text-red-700 font-normal mt-1">Seller</Badge>
                                      <div className="flex-1">
                                        <p className="text-xs text-gray-700">Thank you for your feedback, Alyssa. We're sorry to hear about the battery life. Our team is looking into this and we'd like to offer you a partial refund. Please contact our customer service.</p>
                                        <div className="text-xs text-gray-500 mt-1">2 days ago</div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <Button className="w-full py-2 mt-4 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700">
                          Load More Reviews
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-2xl font-bold text-purple-700">{product.rating}</div>
                        <div className="text-amber-400 flex">
                          {'★'.repeat(Math.floor(product.rating))}
                          {product.rating % 1 !== 0 && '☆'}
                          {'☆'.repeat(5 - Math.ceil(product.rating))}
                        </div>
                        <div className="text-sm text-gray-500">({product.reviewCount} ratings)</div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <Badge variant="secondary" className="bg-purple-100 hover:bg-purple-200 text-purple-800">Amazing colors</Badge>
                        <Badge variant="secondary" className="bg-purple-100 hover:bg-purple-200 text-purple-800">Easy setup</Badge>
                        <Badge variant="secondary" className="bg-purple-100 hover:bg-purple-200 text-purple-800">Great gift</Badge>
                      </div>
                    </div>
                  )}
                  
                  {previewMode && !isTabExpanded("reviews") && (
                    <Button 
                      onClick={() => toggleTabExpand("reviews")} 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2 text-red-500 border-red-500 mt-2"
                    >
                      View More <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                  
                  {previewMode && isTabExpanded("reviews") && (
                    <Button 
                      onClick={() => toggleTabExpand("reviews")} 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2 text-red-500 border-red-500 mt-2"
                    >
                      Show Less <ChevronDown className="h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}
      </div>
    </Tabs>
  );
};

export default ProductTabs;
