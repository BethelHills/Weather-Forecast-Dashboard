import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeDark from "./pages/HomeDark";
import HomeLight from "./pages/HomeLight";
import DetailsDark from "./pages/DetailsDark";
import DetailsLight from "./pages/DetailsLight";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeDark />} />
        <Route path="/light" element={<HomeLight />} />
        <Route path="/details" element={<DetailsDark />} />
        <Route path="/details-light" element={<DetailsLight />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
