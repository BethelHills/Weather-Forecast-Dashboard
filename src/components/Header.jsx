import React from "react";

function Header() {
  return (
    <header className="flex justify-between items-center p-6 bg-gray-800 rounded-md mb-6">
      <h1 className="text-2xl font-bold">Weather Dashboard</h1>
      <input
        type="text"
        placeholder="Search city..."
        className="px-4 py-2 rounded-md text-black w-60"
      />
    </header>
  );
}

export default Header;
