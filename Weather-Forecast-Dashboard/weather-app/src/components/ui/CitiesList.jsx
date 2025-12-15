import React from "react";
import WeatherCard from "./WeatherCard";

export default function CitiesList({ cities }) {
  return (
    <div className="grid grid-cols-5 border border-white/20 rounded-xl overflow-hidden">
      {cities.map((c) => (
        <WeatherCard key={c.name} city={c} />
      ))}
    </div>
  );
}
