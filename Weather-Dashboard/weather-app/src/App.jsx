import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";
import WeatherCard from "./components/WeatherCard";
import CurrentWeather from "./components/CurrentWeather";
import WeeklyForecast from "./components/WeeklyForecast";
import Loader from "./components/Loader";

/* Mock data so layout looks like design */
const mockCities = [
  { id: "cairo", name: "Cairo", temp: "+31.2\u00B0", range: "+31.2\u00B0  +30.22\u00B0", cond: "Clear cloud", icon: "sun" },
  { id: "london", name: "London", temp: "+30.2\u00B0", range: "+30.2\u00B0  +29.12\u00B0", cond: "Cloudy cloud", icon: "cloud" },
  { id: "sydney", name: "Sydney", temp: "+31.2\u00B0", range: "+31.2\u00B0  +30.22\u00B0", cond: "Clear cloud", icon: "sun" },
  { id: "tokyo", name: "Tokyo", temp: "+31.2\u00B0", range: "+31.2\u00B0  +30.22\u00B0", cond: "Clear cloud", icon: "sun-rain" },
  { id: "dubai", name: "Dubai", temp: "+31.2\u00B0", range: "+31.2\u00B0  +30.22\u00B0", cond: "Rainy street", icon: "rain" }
];

export default function App() {
  const [theme, setTheme] = useState("light"); // light or dark
  const [loading, setLoading] = useState(false);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
  <div className={`${theme === "light" ? "light-body" : "dark-body"} min-h-screen flex flex-col`}>
    <header className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0 px-4 sm:px-8">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-white text-lg sm:text-xl">☁</div>
            <div className="flex-1 sm:flex-none"><SearchBar /></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-white/90 hidden md:block">Sun, 18 May&nbsp;&nbsp;|&nbsp;&nbsp;Sunny!</div>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left big column content */}
          <section className="lg:col-span-2 space-y-6">
            <div className="glass p-8 rounded-2xl">
              <h1 className="text-3xl font-semibold text-white">Welcome to BCodeStack-Clouds</h1>
              <p className="mt-3 text-white/80 leading-relaxed">At BCodeStack-Clouds, we believe weather shouldn't just be data, it should be clear, beautiful, and useful.
              This app was created to help you stay prepared for your day with accurate forecasts, stunning visuals, and smart features that make checking the weather feel less like a chore and more like a glance at the sky.
              Whether you're planning a trip, dressing for the day, or just curious about the clouds above.</p>
            </div>

            <div className="glass p-6 rounded-2xl">
              <h2 className="text-lg font-medium text-white mb-4">Major Cities Weather</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {mockCities.map((c) => (
                  <WeatherCard key={c.id} city={c} />
                ))}
              </div>
            </div>
          </section>

          {/* Right column - big logo or current weather */}
          <aside className="space-y-6">
            <div className="glass p-6 rounded-2xl h-full flex flex-col items-center justify-center">
              <div className="text-white/90 text-sm mb-4">BCodeStack-Clouds</div>
              <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-full glass flex items-center justify-center text-4xl sm:text-6xl">☁</div>
            </div>

            <div className="glass p-6 rounded-2xl">
              <CurrentWeather loading={loading} />
            </div>
          </aside>
          </div>
          </div>
        </main>

    {/* Footer */}
    <footer className="text-center text-white/70 text-sm py-4 mt-6">© 2025 BCodeStack-Clouds. All rights reserved.</footer>
  </div>
  );

}


