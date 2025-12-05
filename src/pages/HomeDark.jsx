import React from "react";

export default function HomeDark() {
  const cities = [
    { name: "Cairo", temp1: "+31.2°", temp2: "+30.22°", status: "Clear Cloud", icon: "/weather-icons/sun.png" },
    { name: "London", temp1: "+30.2°", temp2: "+29.12°", status: "Cloudy Sky", icon: "/weather-icons/sun-cloud.png" },
    { name: "Sydney", temp1: "+31.2°", temp2: "+30.22°", status: "Clear Cloud", icon: "/weather-icons/sun.png" },
    { name: "Tokyo", temp1: "+31.2°", temp2: "+30.22°", status: "Clear Cloud", icon: "/weather-icons/windy.png" },
    { name: "Dubai", temp1: "+31.2°", temp2: "+30.22°", status: "Rainy Street", icon: "/weather-icons/rain.png" },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#002E78] to-[#160524] text-white px-16 py-12">

      {/* Header */}
      <div className="flex items-center justify-between mb-16">

        {/* Left group: cloud icon + search bar */}
        <div className="flex items-center gap-4">
          <img src="/weather-icons/cloud-outline.png" className="w-10 opacity-90" />

          <div className="bg-white/10 px-5 py-3 rounded-xl w-[420px] flex items-center">
            <input
              placeholder="Search the Clouds..."
              className="bg-transparent outline-none w-full text-sm text-white/80"
            />
          </div>
        </div>

        {/* Right group: date + toggle + word */}
        <div className="flex items-center gap-6 text-sm">
          <p>Sun ,18 May</p>

          <div className="flex items-center gap-2">
            <div className="w-10 h-5 rounded-full bg-white/20 flex items-center px-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <p>Cloudy!</p>
          </div>

          <p>The future looks <span className="font-semibold">bright</span> — stay tuned!</p>
        </div>
      </div>

      {/* Body */}
      <div className="flex justify-between items-start">

        {/* Welcome text */}
        <div className="max-w-xl">
          <h1 className="text-4xl font-semibold mb-4">Welcome to BCodeStack-Clouds</h1>

          <p className="text-white/80 leading-relaxed mb-2">
            At BCodeStack-Clouds, we believe weather should not just be data, it should be clear,
            beautiful, and useful.
          </p>

          <p className="text-white/80 leading-relaxed mb-6">
            This app was created to help you stay prepared for your day with accurate
            forecasts, stunning visuals, and smart features that make checking the weather
            feel less like a chore and more like a glance at the sky.
          </p>

          <p className="text-white/80 leading-relaxed mb-10">
            Whether you are planning a trip, dressing for the day, or just curious about
            the clouds above.
          </p>
        </div>

        {/* BCodeStack-Clouds Logo */}
        <img src="/weather-icons/BCodeStack-Clouds-logo.png" className="w-64 opacity-90" />
      </div>

      {/* Major Cities Weather */}
      <h2 className="text-xl font-semibold mt-20 mb-6">Major Cities Weather</h2>

      {/* Cards container */}
      <div className="grid grid-cols-5 border border-white/20 rounded-xl overflow-hidden">

        {cities.map((city, index) => (
          <div
            key={city.name}
            className={`p-6 text-center border-r border-dotted border-white/20
            ${index === 4 ? "border-r-0" : ""}`}
          >
            <h3 className="text-lg mb-3">{city.name}</h3>

            <img src={city.icon} className="mx-auto w-16 mb-4" />

            <p className="text-md mb-1">{city.temp1}  {city.temp2}</p>

            <p className="text-sm text-white/70">{city.status}</p>
          </div>
        ))}

      </div>

      {/* Footer */}
      <p className="text-center text-white/40 mt-12 text-sm">
        © 2025 BCodeStack-Clouds. All rights reserved.
      </p>

    </div>
  );
}
