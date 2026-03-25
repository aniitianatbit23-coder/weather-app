import React from 'react';
import { Wind, Droplets, Thermometer, CloudRain } from 'lucide-react';
import { motion } from 'framer-motion';

const WeatherCard = ({ data }) => {
  if (!data) return null;

  const { current, location } = data;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="glass-panel weather-main"
    >
      <div className="location-info">
        <h1>{location.name}</h1>
        <p className="subtitle">{location.region}, {location.country}</p>
      </div>

      <div className="weather-display" style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: '2rem' }}>
        <img src={current.condition.icon} alt={current.condition.text} style={{ width: 120, height: 120 }} />
        <div className="temp-large">{Math.round(current.temp_c)}°C</div>
      </div>

      <p className="condition-text">{current.condition.text}</p>

      <div className="weather-details">
        <div className="detail-item">
          <div className="detail-icon"><Droplets size={24} color="#3b82f6" /></div>
          <div>
            <p className="detail-label">Humidity</p>
            <p className="detail-value">{current.humidity}%</p>
          </div>
        </div>
        <div className="detail-item">
          <div className="detail-icon"><Wind size={24} color="#3b82f6" /></div>
          <div>
            <p className="detail-label">Wind Speed</p>
            <p className="detail-value">{current.wind_kph} km/h</p>
          </div>
        </div>
        <div className="detail-item">
          <div className="detail-icon"><Thermometer size={24} color="#3b82f6" /></div>
          <div>
            <p className="detail-label">Feels Like</p>
            <p className="detail-value">{Math.round(current.feelslike_c)}°C</p>
          </div>
        </div>
        <div className="detail-item">
          <div className="detail-icon"><CloudRain size={24} color="#3b82f6" /></div>
          <div>
            <p className="detail-label">Precipitation</p>
            <p className="detail-value">{current.precip_mm} mm</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
