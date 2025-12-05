import React from "react";

export default function DetailsLight() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-lightStart to-lightEnd text-white px-12 py-10">

      <p className="mb-8 cursor-pointer text-white/90">← Back to Home</p>

      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold">Cairo</h1>
          <p>Friday, 23 May</p>
        </div>
        <img src="/icons/cloud-sun.svg" className="w-40" />
      </div>

      <div className="text-6xl mb-10">+30.42°</div>

      <div className="grid grid-cols-5 gap-6">
        { ["Sun", "Mon", "Tue", "Wed", "Thu"].map((day) => (
          <div
            key={day}
            className="bg-white/20 p-6 rounded-xl text-center"
          >
            <img src="/icons/sun.svg" className="mx-auto mb-3 w-12" />
            <p>{day}</p>
            <p>+31.2°</p>
          </div>
        )) }
      </div>
    </div>
  );
}
