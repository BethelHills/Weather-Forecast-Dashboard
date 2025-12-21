// components/WeatherCards.jsx
import React from "react";

const cities = [
  { name: "New York", temp: "28°C", condition: "Sunny" },
  { name: "London", temp: "22°C", condition: "Cloudy" },
  { name: "Tokyo", temp: "30°C", condition: "Rainy" },
];

function WeatherCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cities.map((city) => (
        <div
          key={city.name}
          className="bg-gray-800 p-6 rounded-lg flex flex-col items-center"
        >
          <h2 className="text-xl font-semibold mb-2">{city.name}</h2>
          <p className="text-3xl font-bold mb-2">{city.temp}</p>
          <p className="text-gray-300">{city.condition}</p>
        </div>
      ))}
    </div>
  );
}

export default WeatherCards;
