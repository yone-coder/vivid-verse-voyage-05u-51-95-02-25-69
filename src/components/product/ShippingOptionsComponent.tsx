import React, { useState } from 'react';
import { Truck, MapPin, Clock, Phone, Bike, Users, Building, Star, Shield, Zap, ChevronRight, X, Store, Home, Bus, Info } from 'lucide-react';
import ProductSectionHeader from './ProductSectionHeader';

const AliExpressDeliverySection = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const deliveryOptions = [
    {
      id: 1,
      icon: <Building className="text-red-600" size={18} />,
      title: "Depot",
      popular: true,
      color: "bg-red-50 border-red-300",
      hoverColor: "hover:bg-red-100",
      timing: {
        primary: "Quick pickup",
        secondary: "At location"
      },
      details: {
        description: "Buyer picks up the item at a designated location like schools, churches, shops, or cybercafés",
        timeRange: "Processing time varies, pickup available when ready",
        priceRange: "50-100 HTG",
        coverage: "Urban & semi-urban zones across Haiti",
        requirements: "Phone number for pickup notification"
      }
    },
    {
      id: 2,
      icon: <Bike className="text-orange-600" size={18} />,
      title: "Express",
      popular: true,
      color: "bg-orange-50 border-orange-300",
      hoverColor: "hover:bg-orange-100",
      timing: {
        primary: "30-90 min",
        secondary: "Door to door"
      },
      details: {
        description: "Motorcycle delivery agent delivers directly to your location using landmarks",
        timeRange: "30-90 minutes for door-to-door delivery",
        priceRange: "100-300 HTG",
        coverage: "Major cities and accessible areas",
        requirements: "Phone confirmation and clear landmark directions"
      }
    },
    {
      id: 3,
      icon: <Users className="text-blue-600" size={18} />,
      title: "Meetup",
      popular: false,
      color: "bg-blue-50 border-blue-300",
      hoverColor: "hover:bg-blue-100",
      timing: {
        primary: "1-3 hours",
        secondary: "Flexible"
      },
      details: {
        description: "Meet the seller at an agreed central location for safe exchange",
        timeRange: "1-3 hours coordination time, flexible scheduling",
        priceRange: "Free",
        coverage: "Local areas and same-zone transactions",
        requirements: "WhatsApp coordination and agreed meeting point"
      }
    },
    {
      id: 4,
      icon: <MapPin className="text-green-600" size={18} />,
      title: "Local",
      popular: false,
      color: "bg-green-50 border-green-300",
      hoverColor: "hover:bg-green-100",
      timing: {
        primary: "15-45 min",
        secondary: "Walking dist."
      },
      details: {
        description: "Delivery within the same neighborhood on foot or bicycle",
        timeRange: "15-45 minutes for nearby delivery",
        priceRange: "Free - 50 HTG",
        coverage: "Immediate neighborhood only",
        requirements: "Must be within walking distance of seller"
      }
    },
    {
      id: 5,
      icon: <Bus className="text-purple-600" size={18} />,
      title: "Transit",
      popular: false,
      color: "bg-purple-50 border-purple-300",
      hoverColor: "hover:bg-purple-100",
      timing: {
        primary: "1-3 days",
        secondary: "Inter-city"
      },
      details: {
        description: "Inter-city delivery via trusted bus companies for long-distance orders",
        timeRange: "1-3 days depending on bus schedule and distance",
        priceRange: "200-500 HTG",
        coverage: "Major cities connected by bus routes",
        requirements: "Coordination with bus company and station pickup"
      }
    },

    {
      id: 6,
      icon: <Home className="text-pink-600" size={18} />,
      title: "Pickup",
      popular: false,
      color: "bg-pink-50 border-pink-300",
      hoverColor: "hover:bg-pink-100",
      timing: {
        primary: "Immediate",
        secondary: "When ready"
      },
      details: {
        description: "Go directly to the seller's home or shop to collect your item",
        timeRange: "Immediate pickup once item is ready",
        priceRange: "Free",
        coverage: "Anywhere seller is located",
        requirements: "Clear directions to seller's location and appointment"
      }
    }
  ];

  return (
    <div>
      {/* Delivery Method Cards */}
      <div>
        <ProductSectionHeader
          title="Delivery Options"
          icon={Truck}
          rightContent={
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="mr-1" size={12} />
              <span>Timing estimates</span>
            </div>
          }
        />

        <div className="grid grid-cols-3 gap-2">
          {(showAll ? deliveryOptions : deliveryOptions.slice(0, 3)).map((option, index) => (
            <div
              key={option.id}
              className={`relative p-2 bg-white border border-gray-200 rounded-lg hover:border-orange-400 hover:shadow-md transition-all cursor-pointer group shadow-sm`}
              onClick={() => setSelectedCard(option)}
            >
              {/* Popular Badge */}
              {option.popular && (
                <div className="absolute -top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-1.5 py-0.5 rounded-full flex items-center shadow-md">
                  <Zap size={8} fill="currentColor" className="mr-0.5" />
                  HOT
                </div>
              )}

              {/* Card Content */}
              <div className="flex flex-col min-w-0 text-center">
                {/* Icon and Title */}
                <div className="flex items-center justify-center">
                  <div className="mr-1.5 group-hover:scale-110 transition-transform flex-shrink-0">
                    {React.cloneElement(option.icon, { size: 14 })}
                  </div>
                  <div className="font-medium text-gray-900 text-sm truncate overflow-hidden text-ellipsis whitespace-nowrap">
                    {option.title}
                  </div>
                </div>
              </div>

              {/* AliExpress-style bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </div>
          ))}
        </div>

        {/* View More/Less Button - Now positioned below the cards */}
        <div className="mt-2">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors flex items-center justify-center"
            >
              More Options
              <ChevronRight size={16} className="ml-1 rotate-90" />
            </button>
          ) : (
            <button
              onClick={() => setShowAll(false)}
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors flex items-center justify-center"
            >
              Less Options
              <ChevronRight size={16} className="ml-1 -rotate-90" />
            </button>
          )}
        </div>

        {/* Modal/Popup for details */}
        {selectedCard && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-sm w-full relative shadow-2xl transform animate-in fade-in-0 zoom-in-95 duration-200">
              {/* Close button */}
              <button 
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-colors z-10"
              >
                <X size={20} />
              </button>

              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-4 rounded-t-xl">
                <div className="flex items-center">
                  <div className="mr-3 p-2 bg-white bg-opacity-20 rounded-lg">
                    {React.cloneElement(selectedCard.icon, { className: "text-white" })}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{selectedCard.title}</h3>
                    <p className="text-orange-100 text-sm opacity-90">Fast & Reliable</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                <div>
                  <p className="text-gray-700 leading-relaxed">{selectedCard.details.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1 flex items-center">
                      <Clock size={14} className="mr-1 text-orange-500" />
                      Delivery Time
                    </h4>
                    <p className="text-sm text-gray-600">{selectedCard.details.timeRange}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1 flex items-center">
                      <MapPin size={14} className="mr-1 text-green-500" />
                      Coverage
                    </h4>
                    <p className="text-sm text-gray-600">{selectedCard.details.coverage}</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-semibold text-blue-900 text-sm mb-1">Requirements</h4>
                  <p className="text-sm text-blue-800">{selectedCard.details.requirements}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 pb-4">
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <p className="text-xs text-orange-700 text-center font-medium">
                    ✨ Final details confirmed at checkout • Secure delivery guaranteed
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AliExpressDeliverySection;