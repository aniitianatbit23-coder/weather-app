import React from 'react';
import { motion } from 'framer-motion';

const Forecast = ({ data }) => {
  if (!data || !data.forecast) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="glass-panel"
    >
      <h3 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>5-Day Forecast</h3>
      <div className="forecast-container">
        {data.forecast.forecastday.map((day) => (
          <div key={day.date} className="forecast-row">
            <span className="forecast-day">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
            </span>
            <div className="forecast-icon">
              <img src={day.day.condition.icon} alt={day.day.condition.text} width="40" />
            </div>
            <span className="forecast-temp">
              {Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Forecast;
