import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-transparent">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-bold text-white">BCodeStack-Clouds</Link>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search city..."
          className="px-3 py-2 rounded-md text-black w-60"
        />
      </div>
    </header>
  );
}

export default Header;
