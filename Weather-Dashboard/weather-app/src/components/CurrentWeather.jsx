import React from "react";

export default function CurrentWeather({ loading }) {
  if (loading) return <div className="py-10"><div className="text-center">Loading...</div></div>;
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm text-white/80">Cairo</div>
        <div className="text-4xl font-semibold text-white">+30.42°</div>
        <div className="text-sm text-white/70">Clear sky · Feels like +31.2°</div>
      </div>
      <div className="text-6xl">⛅</div>
    </div>
  );
}
