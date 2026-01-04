import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import useWeatherLogic from "../hooks/useWeatherLogic";
import { iconUrl } from "../services/openWeather";

export default function HomeDark() {
  const { theme, toggleTheme } = useTheme();

  const {
    query,
    setQuery,
    current,
    forecast,
    majorCities,
    loading,
    error,
    searchSubmit,
    useMyLocation,
    selectMajorCity,
    reload,
  } = useWeatherLogic();

  const [weatherStatus, setWeatherStatus] = useState("Cloudy");

  const toggleWeather = () => {
    setWeatherStatus(prev => (prev === "Cloudy" ? "Rainy" : "Cloudy"));
  };

  // Format cities data for display using majorCities from hook
  const cities = majorCities.length > 0 
    ? majorCities.map(card => ({
        name: card.city,
        temp1: `+${card.temp}°`,
        temp2: `+${card.feelsLike}°`,
        status: card.description,
        icon: iconUrl(card.icon),
      }))
    : [
        // Fallback data while loading
        { name: "Cairo", temp1: "+31.2°", temp2: "+30.22°", status: "Loading...", icon: "/icons/sun.svg" },
        { name: "London", temp1: "+30.2°", temp2: "+29.12°", status: "Loading...", icon: "/icons/cloud-sun.svg" },
        { name: "Sydney", temp1: "+31.2°", temp2: "+30.22°", status: "Loading...", icon: "/icons/sun.svg" },
        { name: "Tokyo", temp1: "+31.2°", temp2: "+30.22°", status: "Loading...", icon: "/icons/cloud-sun.svg" },
        { name: "Dubai", temp1: "+31.2°", temp2: "+30.22°", status: "Loading...", icon: "/icons/cloud-sun.svg" },
      ];

  return (
    <div 
      className={`min-h-screen w-full text-white px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10 lg:px-16 lg:py-12 ${
        theme === "light" 
          ? "bg-gradient-to-br from-[#C48EF1] to-[#5076B4]" 
          : "bg-gradient-to-br from-[#002E78] to-[#160524]"
      }`}
      style={theme === "light" ? {
        background: "linear-gradient(135deg, #C48EF1 0%, #5076B4 100%)"
      } : {}}
    >

      {/* Loading and Error messages */}
      {loading && <p className="text-xs text-white/60 px-2 mb-2">Loading…</p>}
      {error && <p className="text-xs text-red-300 px-2 mb-2">{error}</p>}

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0 px-2 mb-8 sm:mb-12 lg:mb-16">

        {/* Left side: Logo + Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto">
          {/* Logo */}
          <img src="/icons/cloud-sun.svg" alt="BCodeStack-Clouds logo" className="w-10 sm:w-12" />

          {/* Search bar */}
          <form 
            onSubmit={searchSubmit}
            className="flex items-center gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl w-full sm:w-[300px] md:w-[380px] lg:w-[430px]"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
              backdropFilter: "blur(8px)",
            }}
          >
            <svg 
              className={`w-5 h-5 ${theme === "light" ? "text-white opacity-100" : "opacity-80"}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the clouds..."
              className={`bg-transparent text-sm outline-none w-full ${
                theme === "light" 
                  ? "text-white placeholder-white" 
                  : "text-white/90 placeholder-white/60"
              }`}
              style={theme === "light" ? { color: "#ffffff" } : {}}
            />
          </form>

          {/* Location button */}
          <button
            type="button"
            onClick={useMyLocation}
            className="px-4 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm whitespace-nowrap"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
              backdropFilter: "blur(8px)",
            }}
          >
            Use my location
          </button>
        </div>

        {/* Right side: Date + Toggle + Text */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-10 text-xs sm:text-sm w-full lg:w-auto justify-between lg:justify-start">

          {/* Date */}
          <p>
            {(() => {
              const date = new Date();
              const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
              const day = date.getDate();
              const month = date.toLocaleDateString('en-US', { month: 'short' });
              return `${weekday} , ${day} ${month}`;
            })()}
          </p>

          {/* Theme Toggle Switch */}
          <div 
            onClick={toggleTheme} 
            className="relative w-14 h-7 rounded-full cursor-pointer transition-all duration-300"
            style={{
              background: theme === "dark" 
                ? "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)"
                : "linear-gradient(180deg, rgba(255,215,74,0.8) 0%, rgba(255,183,77,0.8) 100%)"
            }}
          >
            <div
              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
                theme === "light" ? "translate-x-7" : ""
              }`}
            >
              {theme === "light" ? (
                <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-3 h-3 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </div>
          </div>

          {/* Weather Status Toggle Switch */}
          <div 
            onClick={toggleWeather} 
            className="relative w-14 h-7 rounded-full cursor-pointer transition-all duration-300"
            style={{
              background: weatherStatus === "Cloudy"
                ? "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)"
                : "linear-gradient(180deg, rgba(59,130,246,0.8) 0%, rgba(37,99,235,0.8) 100%)"
            }}
          >
            <div
              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
                weatherStatus === "Rainy" ? "translate-x-7" : ""
              }`}
            >
              {weatherStatus === "Rainy" ? (
                <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                  <path d="M7 16a1 1 0 100-2 1 1 0 000 2zM9 18a1 1 0 100-2 1 1 0 000 2zM11 16a1 1 0 100-2 1 1 0 000 2z" />
                </svg>
              ) : (
                <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                </svg>
              )}
            </div>
          </div>

          {/* Weather Status Text */}
          <p className="text-sm font-semibold">
            {current ? `${current.description} ${current.temp}°C` : weatherStatus}!
          </p>

          {/* Right text */}
          <p className="text-white/70 text-xs sm:text-sm">
            The future looks <span className="font-semibold text-white">bright</span> — stay tuned!
          </p>

        </div>

      </div>

      {/* Body */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-0 mb-12 sm:mb-16 lg:mb-20">
        
        {/* Transparent Box for Writeup */}
        <div className="bg-white/10 rounded-xl p-6 sm:p-8 max-w-2xl w-full border border-white/20">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">
            {current ? `${current.city}, ${current.country || ''}` : 'Welcome to BCodeStack-Clouds'}
          </h1>

          {current ? (
            <div className="mb-4">
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={iconUrl(current.icon)}
                  alt={current.description || "weather icon"}
                  className="w-16 h-16"
                />
                <div>
                  <p className="text-3xl sm:text-4xl font-bold">{current.temp}°C</p>
                  <p className="text-white/80 text-sm">Feels like {current.feelsLike}°C</p>
                </div>
              </div>
              <p className="text-white/90 text-lg capitalize">{current.description}</p>
              <div className="flex gap-4 mt-2 text-sm text-white/70">
                <span>Humidity: {current.humidity}%</span>
                <span>Wind: {current.windSpeed} m/s</span>
              </div>
            </div>
          ) : (
            <>
              <p className="text-white/80 leading-relaxed mb-2">
                At BCodeStack-Clouds, we believe weather should not just be data, it should be clear,
                beautiful, and useful.
              </p>

              <p className="text-white/80 leading-relaxed mb-6">
                This app was created to help you stay prepared for your day with accurate
                forecasts, stunning visuals, and smart features that make checking the weather
                feel less like a chore and more like a glance at the sky.
              </p>

              <p className="text-white/80 leading-relaxed">
                Whether you are planning a trip, dressing for the day, or just curious about
                the clouds above.
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col items-center w-full lg:w-auto">
          <img src="/weather-icons/BCodeStack-Clouds-logo.png" className="w-48 sm:w-56 lg:w-64 opacity-90" />
          <p className="text-white text-base sm:text-lg font-semibold mt-2">BCodeStack-Clouds</p>
        </div>
      </div>

      {/* Forecast section */}
      {forecast.length > 0 && (
        <>
          <h2 className="text-lg sm:text-xl font-semibold mt-12 sm:mt-16 lg:mt-20 mb-4 sm:mb-6">5-Day Forecast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12">
            {forecast.map((day, index) => {
              const date = new Date(day.date);
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
              return (
                <div
                  key={day.date}
                  className="bg-white/10 rounded-xl p-4 text-center border border-white/20"
                >
                  <p className="text-sm text-white/80 mb-2">{dayName}</p>
                  <img
                    src={iconUrl(day.icon)}
                    alt={day.description || "weather icon"}
                    className="mx-auto w-12 h-12 mb-2"
                  />
                  <p className="text-sm font-semibold">{day.max}° / {day.min}°</p>
                  <p className="text-xs text-white/70 capitalize">{day.description}</p>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Cities */}
      <h2 className="text-lg sm:text-xl font-semibold mt-12 sm:mt-16 lg:mt-20 mb-4 sm:mb-6">Major Cities Weather</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border border-white/20 rounded-xl overflow-hidden">

        {cities.map((city, index) => (
          <div
            key={city.name}
            onClick={() => selectMajorCity(city.name)}
            className={`p-4 sm:p-6 text-center border-b sm:border-b-0 sm:border-r border-dotted border-white/20 cursor-pointer hover:bg-white/5 transition-colors ${
              index === cities.length - 1 ? "border-b-0" : ""
            } ${
              (index + 1) % 2 === 0 ? "sm:border-r-0" : ""
            } ${
              (index + 1) % 3 === 0 ? "md:border-r-0" : ""
            } ${
              (index + 1) % 5 === 0 ? "lg:border-r-0" : ""
            }`}
          >
            <h3 className="text-base sm:text-lg mb-2 sm:mb-3">{city.name}</h3>
            <img src={city.icon} alt={`${city.name} weather icon`} className="mx-auto w-12 sm:w-16 mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base">{city.temp1} {city.temp2}</p>
            <p className="text-xs sm:text-sm text-white/70 capitalize">{city.status}</p>
          </div>
        ))}

      </div>

      <p className="text-center text-white/40 mt-12 text-sm">
        © 2025 BCodeStack-Clouds. All rights reserved.
      </p>

    </div>
  );
}
