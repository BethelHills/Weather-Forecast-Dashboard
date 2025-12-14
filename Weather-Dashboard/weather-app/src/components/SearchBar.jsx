import React from "react";

export default function SearchBar() {
  return (
  <div className="relative w-full sm:w-[380px] max-w-full">
      <input
        aria-label="Search city"
        placeholder="Search the clouds"
        className="w-full py-3 pl-4 pr-10 rounded-xl glass text-white placeholder-white/60 focus:outline-none"
      />
      <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg glass">
        🔍
      </button>
    </div>
  );
}
