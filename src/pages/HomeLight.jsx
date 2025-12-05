import React from "react";

export default function HomeLight() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-lightStart to-lightEnd text-white px-10 py-8">

      <div className="flex items-center justify-between mb-12">
        <input
          className="bg-white/30 px-4 py-2 rounded-lg outline-none w-96"
          placeholder="Search the clouds..."
        />
        <p>Sun, 18 May • Sunny</p>
      </div>

      <div className="mb-14 max-w-2xl">
        <h1 className="text-3xl font-bold mb-3">Welcome to BCodeStack-Clouds</h1>
        <p className="text-white/90">
          We help you stay prepared for your day with accurate forecasts.
        </p>
      </div>

      <h2 className="mb-6 text-xl font-semibold">Major Cities Weather</h2>

      <div className="grid grid-cols-5 gap-6">
        { ["Cairo", "London", "Sydney", "Tokyo", "Dubai"].map((city) => (
          <div
            key={city}
            className="bg-white/20 p-6 rounded-xl text-center"
          >
            <img src="/icons/sun.png" className="mx-auto mb-3 w-14" />
            <h3 className="mb-1">{city}</h3>
            <p>+31.2° • +30.22°</p>
            <p className="text-sm">Clear cloud</p>
          </div>
        )) }
      </div>
    </div>
  );
}
