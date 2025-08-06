import React, { useState, useMemo } from 'react';
import { Globe, Languages, Check, X, HelpCircle, Search, Pin, ChevronLeft, MapPin } from 'lucide-react';
import { useLanguage, supportedLanguages } from '@/context/LanguageContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { countries, states, cities, Country, State, City } from '@/data/locations';

const LanguageLocationScreen = ({ onClose }) => {
  const { currentLanguage, setLanguage, currentLocation, setLocation } = useLanguage();

  const [languageQuery, setLanguageQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [pinnedLanguages, setPinnedLanguages] = useState(new Set(['en', 'es']));
  
  // Location hierarchy state
  const [locationLevel, setLocationLevel] = useState<'countries' | 'states' | 'cities'>('countries');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

  const handleLanguageSelect = (language) => {
    setLanguage(language);
    onClose();
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setLocationLevel('states');
    setBreadcrumb([country.name]);
  };

  const handleStateSelect = (state: State) => {
    setSelectedState(state);
    setLocationLevel('cities');
    setBreadcrumb([selectedCountry?.name || '', state.name]);
  };

  const handleCitySelect = (city: City) => {
    const location = {
      code: `${city.countryCode}-${city.stateCode}`,
      name: `${city.name}, ${selectedState?.name}, ${selectedCountry?.name}`,
      flag: selectedCountry?.flag || 'us'
    };
    setLocation(location);
    onClose();
  };

  const goBack = () => {
    if (locationLevel === 'cities') {
      setLocationLevel('states');
      setBreadcrumb([selectedCountry?.name || '']);
    } else if (locationLevel === 'states') {
      setLocationLevel('countries');
      setSelectedCountry(null);
      setBreadcrumb([]);
    }
  };

  const toggleLanguagePin = (languageCode) => {
    setPinnedLanguages((prev) => {
      const newSet = new Set(prev);
      newSet.has(languageCode) ? newSet.delete(languageCode) : newSet.add(languageCode);
      return newSet;
    });
  };


  const filteredLanguages = useMemo(() => {
    const filtered = supportedLanguages.filter((lang) =>
      lang.name.toLowerCase().includes(languageQuery.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(languageQuery.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const aPinned = pinnedLanguages.has(a.code);
      const bPinned = pinnedLanguages.has(b.code);
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;
      return 0;
    });
  }, [languageQuery, pinnedLanguages]);

  const filteredCountries = useMemo(() => {
    return countries.filter((country) =>
      country.name.toLowerCase().includes(locationQuery.toLowerCase())
    );
  }, [locationQuery]);

  const filteredStates = useMemo(() => {
    if (!selectedCountry) return [];
    return states
      .filter((state) => state.countryCode === selectedCountry.code)
      .filter((state) => state.name.toLowerCase().includes(locationQuery.toLowerCase()));
  }, [selectedCountry, locationQuery]);

  const filteredCities = useMemo(() => {
    if (!selectedState) return [];
    return cities
      .filter((city) => city.stateCode === selectedState.code && city.countryCode === selectedCountry?.code)
      .filter((city) => city.name.toLowerCase().includes(locationQuery.toLowerCase()));
  }, [selectedState, selectedCountry, locationQuery]);

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white p-3">
        <div className="relative flex items-center justify-center">
          <button
            onClick={onClose}
            className="absolute left-0 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Language & Location</h1>
          <button className="absolute right-0 text-gray-600 hover:text-gray-900 transition-colors">
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
        <div className="text-center mt-1">
          <p className="text-sm text-gray-500">Select the language and the location</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="language" className="h-full flex flex-col">
          <div className="px-3 pt-6">
            <TabsList className="w-full grid grid-cols-2 bg-gray-50">
              <TabsTrigger value="language" className="data-[state=active]:bg-white">
                Language
              </TabsTrigger>
              <TabsTrigger value="location" className="data-[state=active]:bg-white">
                Location
              </TabsTrigger>
            </TabsList>
          </div>

          {/* LANGUAGE TAB */}
          <TabsContent value="language" className="flex-1 overflow-y-auto px-3 pb-6">
            <div className="mt-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search language..."
                  value={languageQuery}
                  onChange={(e) => setLanguageQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="space-y-2">
                {filteredLanguages.map((language) => (
                  <div
                    key={language.code}
                    className="flex items-center w-full hover:bg-orange-50 rounded-lg text-sm transition-colors border border-transparent hover:border-orange-200"
                  >
                    <button
                      className="flex items-center justify-between flex-1 p-4"
                      onClick={() => handleLanguageSelect(language)}
                    >
                      <div className="flex items-center gap-4">
                        <Languages className="h-5 w-5 text-orange-600" />
                        <div className="text-left">
                          <div className="font-medium text-gray-900 flex items-center gap-2">
                            {language.nativeName}
                            {pinnedLanguages.has(language.code) && (
                              <Pin className="h-3 w-3 text-orange-600 fill-current" />
                            )}
                          </div>
                          <div className="text-xs text-gray-500">{language.name}</div>
                        </div>
                      </div>
                      {currentLanguage.code === language.code && (
                        <Check className="h-5 w-5 text-orange-600" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleLanguagePin(language.code)}
                      className={`p-2 mr-2 rounded-md transition-colors ${
                        pinnedLanguages.has(language.code)
                          ? 'text-orange-600 hover:bg-orange-100'
                          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                      }`}
                      title={pinnedLanguages.has(language.code) ? 'Unpin' : 'Pin'}
                    >
                      <Pin className={`h-4 w-4 ${pinnedLanguages.has(language.code) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* LOCATION TAB */}
          <TabsContent value="location" className="flex-1 overflow-y-auto px-3 pb-6">
            <div className="mt-4">
              {/* Breadcrumb and Back Button */}
              {locationLevel !== 'countries' && (
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={goBack}
                    className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="text-sm font-medium">Back</span>
                  </button>
                  {breadcrumb.length > 0 && (
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      {breadcrumb.map((item, index) => (
                        <span key={index}>
                          {index > 0 && <span className="mx-1">›</span>}
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={
                    locationLevel === 'countries' ? 'Search countries...' :
                    locationLevel === 'states' ? 'Search states...' :
                    'Search cities...'
                  }
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Countries List */}
              {locationLevel === 'countries' && (
                <div className="space-y-2">
                  {filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      className="flex items-center justify-between w-full p-4 hover:bg-orange-50 rounded-lg text-sm transition-colors border border-transparent hover:border-orange-200"
                      onClick={() => handleCountrySelect(country)}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={`https://flagcdn.com/${country.flag.toLowerCase()}.svg`}
                          alt={country.name}
                          className="h-6 w-6 rounded-full object-cover"
                        />
                        <span className="font-medium text-gray-900">{country.name}</span>
                      </div>
                      <ChevronLeft className="h-4 w-4 text-gray-400 rotate-180" />
                    </button>
                  ))}
                </div>
              )}

              {/* States List */}
              {locationLevel === 'states' && (
                <div className="space-y-2">
                  {filteredStates.map((state) => (
                    <button
                      key={state.code}
                      className="flex items-center justify-between w-full p-4 hover:bg-orange-50 rounded-lg text-sm transition-colors border border-transparent hover:border-orange-200"
                      onClick={() => handleStateSelect(state)}
                    >
                      <div className="flex items-center gap-4">
                        <MapPin className="h-5 w-5 text-orange-600" />
                        <span className="font-medium text-gray-900">{state.name}</span>
                      </div>
                      <ChevronLeft className="h-4 w-4 text-gray-400 rotate-180" />
                    </button>
                  ))}
                </div>
              )}

              {/* Cities List */}
              {locationLevel === 'cities' && (
                <div className="space-y-2">
                  {filteredCities.map((city, index) => (
                    <button
                      key={index}
                      className="flex items-center justify-between w-full p-4 hover:bg-orange-50 rounded-lg text-sm transition-colors border border-transparent hover:border-orange-200"
                      onClick={() => handleCitySelect(city)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center">
                          <MapPin className="h-3 w-3 text-orange-600" />
                        </div>
                        <span className="font-medium text-gray-900">{city.name}</span>
                      </div>
                      <Check className="h-4 w-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LanguageLocationScreen;