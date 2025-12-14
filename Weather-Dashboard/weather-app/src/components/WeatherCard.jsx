import React from "react";

function Icon({ name }) {
  // simple emoji stand-in. Replace with vector icons later.
  if (name === "sun") return "☀️";
  if (name === "cloud") return "⛅";
  if (name === "rain") return "🌧️";
  if (name === "sun-rain") return "⛅🌦️";
  return "☁️";
}

export default function WeatherCard({ city }) {
  return (
    <div className="glass p-4 rounded-xl flex flex-col items-start gap-3">
      <div className="flex items-center gap-3 w-full justify-between">
        <div className="text-sm text-white/90">{city.name}</div>
        <div className="text-2xl">{Icon({ name: city.icon })}</div>
      </div>
      <div className="text-white text-lg">{city.temp}</div>
      <div className="text-xs text-white/80">{city.cond}</div>
    </div>
  );
}
