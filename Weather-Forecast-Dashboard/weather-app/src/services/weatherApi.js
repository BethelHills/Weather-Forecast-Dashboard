const API_KEY = '6047ac99cf043a0dcd05fdb2e6ec37c6';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetch current weather data by latitude and longitude
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Weather data
 */
export const getWeatherByCoordinates = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

/**
 * Fetch current weather data by city name
 * @param {string} cityName - City name
 * @returns {Promise<Object>} Weather data
 */
export const getWeatherByCity = async (cityName) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

/**
 * Format weather data for display
 * @param {Object} data - Raw weather data from API
 * @returns {Object} Formatted weather data
 */
export const formatWeatherData = (data) => {
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
};
