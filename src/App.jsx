import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import { fetchWeather, fetchWeatherByCoords } from './services/weatherService';
import './index.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bgImage, setBgImage] = useState('https://images.unsplash.com/photo-1534088568595-a066f710b7e9?q=80&w=1974&auto=format&fit=crop');

  const updateBackground = (condition) => {
    const code = condition.toLowerCase();
    if (code.includes('sunny') || code.includes('clear')) {
      setBgImage('https://images.unsplash.com/photo-1504386106331-3e4e71712b38?q=80&w=1932&auto=format&fit=crop');
    } else if (code.includes('cloudy') || code.includes('overcast')) {
      setBgImage('https://images.unsplash.com/photo-1483977399921-6cf94f6fdc3a?q=80&w=2093&auto=format&fit=crop');
    } else if (code.includes('rain') || code.includes('drizzle') || code.includes('showers')) {
      setBgImage('https://images.unsplash.com/photo-1534274988757-a28bf1f539cf?q=80&w=2030&auto=format&fit=crop');
    } else if (code.includes('thunder')) {
      setBgImage('https://images.unsplash.com/photo-1605727281914-504724408f6d?q=80&w=1935&auto=format&fit=crop');
    } else if (code.includes('snow') || code.includes('ice') || code.includes('blizzard')) {
      setBgImage('https://images.unsplash.com/photo-1478265409131-1f65c88f965c?q=80&w=1935&auto=format&fit=crop');
    } else {
      setBgImage('https://images.unsplash.com/photo-1534088568595-a066f710b7e9?q=80&w=1974&auto=format&fit=crop');
    }
  };

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
      updateBackground(data.current.condition.text);
    } catch (err) {
      setError('City not found. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setLoading(true);
        try {
          const data = await fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
          setWeatherData(data);
          updateBackground(data.current.condition.text);
        } catch (err) {
          setError('Could not fetch weather for your location.');
        } finally {
          setLoading(false);
        }
      });
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    handleSearch('London'); // Default city
  }, []);

  return (
    <div className="app-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="content-wrapper">
        <div className="main-section">
          <SearchBar onSearch={handleSearch} onLocationClick={handleLocation} />
          
          {loading && (
            <div className="glass-panel" style={{ textAlign: 'center' }}>
              <p>Fetching weather data...</p>
            </div>
          )}

          {error && (
            <div className="glass-panel" style={{ color: '#ef4444', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          {!loading && weatherData && <WeatherCard data={weatherData} />}
        </div>
        
        <div className="sidebar-section">
          {!loading && weatherData && <Forecast data={weatherData} />}
        </div>
      </div>
    </div>
  );
};

export default App;
