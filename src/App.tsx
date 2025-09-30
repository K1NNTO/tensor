import React, { useState } from 'react';
import Header from './components/Header';
import MusicSection from './components/MusicSection';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';

/**
 * Главный компонент приложения.
 * Содержит состояние поискового запроса и переключение между секциями.
 */
function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="App">
      <Header onSearch={setSearchQuery} />
      {searchQuery ? (
        <SearchResults query={searchQuery} onSearch={setSearchQuery} />
      ) : (
        <MusicSection />
      )}
      <Footer />
    </div>
  );
}

export default App;
