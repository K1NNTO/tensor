import React, { useState } from 'react';


/**
 * Компонент Header отображает логотип, навигацию и панель поиска.
 * При клике на кнопку поиска переключается в режим ввода поискового запроса.
 *
 * @param onSearch - функция, вызываемая с поисковым запросом
 */
const Header = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setIsSearching(false);
    }
  };

  return (
    <header className="header">
      {!isSearching ? (
        <>
          <div className="logo">last.fm</div>
          <nav className="nav">
            <button onClick={() => setIsSearching(true)} className="search-button">
              <img
                src="https://img.icons8.com/?size=100&id=132&format=png&color=FFFFFF"
                alt="Search"
                className="search-icon"
              />
            </button>
            <a href="#">Live</a>
            <a href="#">Music</a>
            <a href="#">Charts</a>
            <a href="#">Events</a>
            <div className="profile-icon"></div>
          </nav>
        </>
      ) : (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
            className="search-input"
          />

          <button
            onClick={() => {
              setIsSearching(false);
              setSearchQuery('');
              onSearch('');
            }}
            className="close-button"
          >
            ✕
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
