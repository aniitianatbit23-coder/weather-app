import axios from 'axios';

const API_KEY = '9814f7bd4a0747c493945324250612';
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: city,
        days: 5,
        aqi: 'yes',
        alerts: 'no'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const fetchWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: `${lat},${lon}`,
        days: 5,
        aqi: 'yes',
        alerts: 'no'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data by coords:', error);
    throw error;
  }
};
