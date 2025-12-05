import React from "react";

export default function HomeDark() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-darkStart to-darkEnd text-white px-10 py-8">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <input
          className="bg-white/10 px-4 py-2 rounded-lg outline-none w-96"
          placeholder="Search the clouds..."
        />
        <p>Sun, 18 May • Cloudy</p>
      </div>

      {/* Welcome Section */}
      <div className="mb-14 max-w-2xl">
        <h1 className="text-3xl font-bold mb-3">Welcome to BCodeStack-Clouds</h1>
        <p className="text-white/70">
          At BCodeStack-Clouds, we believe weather should just not be data. It should be
          clear, beautiful, and useful.
        </p>
      </div>

      {/* Cities */}
      <h2 className="mb-6 text-xl font-semibold">Major Cities Weather</h2>

      <div className="grid grid-cols-5 gap-6">
        { ["Cairo", "London", "Sydney", "Tokyo", "Dubai"].map((city) => (
          <div
            key={city}
            className="bg-white/10 p-6 rounded-xl text-center"
          >
            <img src="/icons/sun.svg" className="mx-auto mb-3 w-14" />
            <h3 className="mb-1">{city}</h3>
            <p>+31.2° • +30.22°</p>
            <p className="text-sm text-white/70">Clear sky</p>
          </div>
        )) }
      </div>
    </div>
  );
}
