
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AliExpressSearchBar from '@/components/shared/AliExpressSearchBar';

interface HeaderSearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isSearchFocused: boolean;
  handleSearchFocus: () => void;
  handleClearSearch: () => void;
  voiceSearchActive: boolean;
  handleVoiceSearch: () => void;
  isGlowing?: boolean;
}

const HeaderSearchBar = ({
  searchQuery,
  setSearchQuery,
  isSearchFocused,
  handleSearchFocus,
  handleClearSearch,
  voiceSearchActive,
  handleVoiceSearch,
  isGlowing = false
}: HeaderSearchBarProps) => {
  const { t } = useLanguage();
  
  return (
    <AliExpressSearchBar
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      placeholder={t('header.search')}
      onFocus={handleSearchFocus}
    />
  );
};

export default HeaderSearchBar;
