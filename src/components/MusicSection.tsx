import React, { useEffect, useState } from 'react';

interface Image {
  size: string;
  ['#text']: string;
}

interface Artist {
  name: string;
  playcount?: string;
  listeners?: string;
  mbid?: string;
  image?: Image[];
  url?: string;
}

interface Track {
  name: string;
  playcount?: string;
  listeners?: string;
  mbid?: string;
  artist?: { name: string , url: string};
  image?: Image[];
  url: string;
}

/**
 * Компонент для отображения популярных артистов и треков.
 * Загружает данные с Last.fm API при монтировании.
 */

const MusicSection = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const API_KEY = 'bb72f5eb66111e4ad11d3042e333c1f9';

    /**
   * Загружает топ-артистов и топ-треки с Last.fm API.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistRes = await fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${API_KEY}&format=json&limit=12`);
        const trackRes = await fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=9`);

        const artistJson = await artistRes.json();
        const trackJson = await trackRes.json();

        setArtists(artistJson.artists.artist);
        setTracks(trackJson.tracks.track);
      } catch (error) {
        console.error('Failed to fetch data from Last.fm', error);
      }
    };

    fetchData();
  }, []);

   /**
   * Возвращает URL изображения заданного размера.
   * @param images - массив изображений
   * @param size - желаемый размер (по умолчанию 'extralarge')
   * @returns URL изображения или пустая строка, если не найдено
   */
  const getImage = (images?: Image[], size: string = 'extralarge') =>
    images?.find(img => img.size === size)?.['#text'] || '';

  return (
    <section className="music-section">
      <div className="heading"><h2>Hot Right now</h2><hr /></div>
      {[0, 1].map((row) => (
        <div className="guys" key={row}>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const artist = artists[i];
            return artist ? (
              <div className="guy" key={i}>
                <a href={artist.url}>
                  <img src={getImage(artist.image, 'extralarge')} alt={artist.name} />
                  <h4>{artist.name}</h4>
                </a>

                <div className="mini-genres">
                  <ul>
                    <li><a href="#">Genre 1</a></li>
                    <li><a href="#">Genre 2</a></li>
                  </ul>
                </div>
              </div>
            ) : null;
          })}
        </div>
      ))}

      <div className="heading"><h2>Popular tracks</h2><hr /></div>

      <section className="popular-tracks">

        {[0, 1, 2].map((col) => (
          <div className={`${col === 0 ? 'first' : col === 1 ? 'second' : 'third'}-col`} key={col}>
            <div className="tracks">
              {[0, 1, 2].map((i) => {
                const trackIndex = col * 3 + i;
                const track = tracks[trackIndex];
                return track ? (
                  <div className="track" key={trackIndex}>
                    <img src={getImage(track.image, 'extralarge')} alt={track.name} />
                    <div className="info">
                      <h4><a href={track.url}>{track.name}</a></h4>
                      <p><a href={track.artist?.url}>{track.artist?.name}</a></p>
                      <div className="mini-genres">
                        <ul>
                          <li><a href="#">Genre 1</a></li>
                          <li><a href="#">Genre 2</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};

export default MusicSection;
