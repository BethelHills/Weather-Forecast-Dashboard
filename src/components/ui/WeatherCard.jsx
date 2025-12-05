import React from "react";

export default function WeatherCard({ city }) {
  return (
    <div className="p-6 text-center border-r border-dotted border-white/20 last:border-r-0">
      <h3 className="text-lg mb-3">{city.name}</h3>
      <img src={city.icon} alt={`${city.name} weather icon`} className="mx-auto w-16 mb-4" />
      <p className="text-md mb-1">{city.temp1} {city.temp2}</p>
      <p className="text-sm text-white/70">{city.status}</p>
    </div>
  );
}
