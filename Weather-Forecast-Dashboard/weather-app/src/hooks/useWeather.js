import { useState, useEffect } from 'react';
import { getWeatherByCoordinates, getWeatherByCity, formatWeatherData } from '../services/weatherApi';

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
          data = await getWeatherByCity(city);
        } else {
          data = await getWeatherByCoordinates(lat, lon);
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
        const promises = cities.map(city => getWeatherByCity(city));
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
