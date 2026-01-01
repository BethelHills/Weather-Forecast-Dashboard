import { useState, useEffect } from 'react';
import { getCurrentByCity, getCurrentByCoords } from '../lib/weatherApi';

/**
 * Format weather data for display
 * @param {Object} data - Raw weather data from API
 * @returns {Object} Formatted weather data
 */
function formatWeatherData(data) {
  if (!data) return null;
  
  return {
    city: data.name,
    country: data.sys?.country,
    temperature: Math.round(data.main?.temp || 0),
    feelsLike: Math.round(data.main?.feels_like || 0),
    description: data.weather?.[0]?.description || '',
    main: data.weather?.[0]?.main || '',
    humidity: data.main?.humidity || 0,
    windSpeed: data.wind?.speed || 0,
    pressure: data.main?.pressure || 0,
    icon: data.weather?.[0]?.icon || '',
    iconUrl: `https://openweathermap.org/img/wn/${data.weather?.[0]?.icon || '01d'}@2x.png`,
  };
}

/**
 * Custom hook to fetch and manage weather data
 * @param {Object} options - Configuration options
 * @param {number} options.lat - Latitude (default: 6.5244 for Lagos)
 * @param {number} options.lon - Longitude (default: 3.3792 for Lagos)
 * @param {string} options.city - City name (alternative to lat/lon)
 * @returns {Object} Weather data and loading/error states
 */
export const useWeather = ({ lat = 6.5244, lon = 3.3792, city = null } = {}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let data;
        if (city) {
          data = await getCurrentByCity(city);
        } else {
          data = await getCurrentByCoords(lat, lon);
        }
        
        const formatted = formatWeatherData(data);
        setWeatherData(formatted);
      } catch (err) {
        setError(err.message);
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon, city]);

  return { weatherData, loading, error };
};

/**
 * Hook to fetch weather for multiple cities
 * @param {Array<string>} cities - Array of city names
 * @returns {Object} Weather data array and loading/error states
 */
export const useMultipleCitiesWeather = (cities = []) => {
  const [citiesWeather, setCitiesWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllCities = async () => {
      if (cities.length === 0) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const promises = cities.map(city => getCurrentByCity(city));
        const results = await Promise.allSettled(promises);
        
        const weatherData = results.map((result, index) => {
          if (result.status === 'fulfilled') {
            return formatWeatherData(result.value);
          } else {
            console.error(`Failed to fetch weather for ${cities[index]}:`, result.reason);
            return null;
          }
        }).filter(Boolean);

        setCitiesWeather(weatherData);
      } catch (err) {
        setError(err.message);
        console.error('Cities weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCities();
  }, [cities]);

  return { citiesWeather, loading, error };
};
