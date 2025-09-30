import React, { useEffect, useState } from "react";

const API_KEY = "bb72f5eb66111e4ad11d3042e333c1f9";
const BASE_URL = "https://ws.audioscrobbler.com/2.0/";

interface Image {
  "#text": string;
  size: "small" | "medium" | "large" | "extralarge" | "mega";
}

interface Artist {
  name: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: string;
  image: Image[];
}

interface Album {
  name: string;
  artist: string;
  mbid: string;
  url: string;
  streamable: string;
  image: Image[];
}

interface Track {
  name: string;
  artist: string;
  url: string;
  streamable: string;
  listeners: string;
  image: Image[];
  mbid: string;
}

interface SearchResultsProps {
  query: string;
  onSearch: (query: string) => void;
}
/**
 * Компонент для отображения результатов поиска артистов, альбомов и треков.
 * @param query - поисковый запрос
 * @param onSearch - функция для обновления поискового запроса
 */
const SearchResults: React.FC<SearchResultsProps> = ({ query, onSearch }) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [searchInput, setSearchInput] = useState(query);

   /**
   * Выполняет загрузку данных по поисковому запросу из API Last.fm.
   */
  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        const [artistRes, albumRes, trackRes] = await Promise.all([
          fetch(`${BASE_URL}?method=artist.search&artist=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json`).then(res => res.json()),
          fetch(`${BASE_URL}?method=album.search&album=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json`).then(res => res.json()),
          fetch(`${BASE_URL}?method=track.search&track=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json`).then(res => res.json())
        ]);

        setArtists(artistRes.results.artistmatches.artist || []);
        setAlbums(albumRes.results.albummatches.album || []);
        setTracks(trackRes.results.trackmatches.track || []);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    fetchData();
    setSearchInput(query);
  }, [query]);

   /**
   * Обрабатывает отправку формы поиска.
   * @param e - событие формы
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
    }
  };

  /**
   * Очищает поле ввода поиска.
   */
  const handleClear = () => {
    setSearchInput("");
  };


   /**
   * Получает URL изображения нужного размера из массива изображений.
   * @param images - массив изображений
   * @param size - размер изображения (по умолчанию "extralarge")
   * @returns URL изображения или пустая строка
   */
  const getImageUrl = (images: Image[], size: Image["size"] = "extralarge") =>
    images.find(img => img.size === size)?.["#text"] || "";

  return (
    <div className="search-results">
      <h1>Search results for "{query}"</h1>

      <nav className="secondary-nav" aria-label="Secondary navigation">
        <ul>
          <li><a href="#">Top Results</a></li>
          <li><a href="#">Artists</a></li>
          <li><a href="#">Albums</a></li>
          <li><a href="#">Tracks</a></li>
        </ul>
      </nav>

      <section className="search-wrapper">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
          {searchInput && (
            <button type="button" className="clear-btn" onClick={handleClear}>&times;</button>
          )}
          <div className="divider"></div>
          <button type="submit" className="search-btn">
            <img
              src="https://img.icons8.com/?size=100&id=132&format=png&color=1A1A1A"
              alt="Search"
              className="search-icon"
            />
          </button>
        </form>
      </section>

      <section className="artists-sq">
        <h2>Artists</h2>
        <div className="artists-sq-list">
          {artists.slice(0, 8).map((artist, index) => (
            <div className="card" key={index}>
              <img src={getImageUrl(artist.image)} alt={artist.name} className="card-bg" />
              <div className="card-content">
                <div className="card-price">
                  <a href={artist.url} target="_blank" rel="noreferrer">{artist.name}</a>
                </div>
                <div className="card-listeners">{artist.listeners} listeners</div>
              </div>
            </div>
          ))}
        </div>
        <div className="more-tracks">More artists &gt;</div>
      </section>

      <section className="albums-sq">
        <h2>Albums</h2>
        <div className="albums-sq-list">
          {albums.slice(0, 8).map((album, index) => (
            <div className="card" key={index}>
              <img src={getImageUrl(album.image)} alt={album.name} className="card-bg" />
              <div className="card-content">
                <div className="card-price">
                  <a href={album.url} target="_blank" rel="noreferrer">{album.name}</a>
                </div>
                <div className="card-listeners">{album.artist}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="more-tracks">More albums &gt;</div>
      </section>

      <section className="tracks-container">
        <h2>Tracks</h2>
        {tracks.slice(0, 6).map((track, index) => (
          <div className="track" key={index}>
            <button className="play-btn">▶</button>
            <img src={getImageUrl(track.image, "medium")} className="cover" alt={track.name} />
            <div className="info">
              <div className="title">{track.name}</div>
              <div className="artist">{track.artist}</div>
            </div>
            <div className="duration">{track.listeners} listeners</div>
          </div>
        ))}
        <div className="more-tracks">More tracks &gt;</div>
      </section>
    </div>
  );
};

export default SearchResults;
