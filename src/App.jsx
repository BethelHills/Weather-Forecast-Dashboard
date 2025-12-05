import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomeDark from "./pages/HomeDark";
import HomeLight from "./pages/HomeLight";
import DetailsDark from "./pages/DetailsDark";
import DetailsLight from "./pages/DetailsLight";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <header className="p-4 flex items-center gap-4 bg-transparent">
          <Link to="/" className="px-3 py-2 rounded-md bg-white/10 text-white">Home Dark</Link>
          <Link to="/light" className="px-3 py-2 rounded-md bg-white/10 text-white">Home Light</Link>
          <Link to="/details" className="px-3 py-2 rounded-md bg-white/10 text-white">Details Dark</Link>
          <Link to="/details-light" className="px-3 py-2 rounded-md bg-white/10 text-white">Details Light</Link>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomeDark />} />
            <Route path="/light" element={<HomeLight />} />
            <Route path="/details" element={<DetailsDark />} />
            <Route path="/details-light" element={<DetailsLight />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
