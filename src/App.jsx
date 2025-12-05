import React, { useState } from "react";
import HomeDark from "./pages/HomeDark";
import HomeLight from "./pages/HomeLight";
import DetailsDark from "./pages/DetailsDark";
import DetailsLight from "./pages/DetailsLight";

const VIEWS = {
  HOME_DARK: "HOME_DARK",
  HOME_LIGHT: "HOME_LIGHT",
  DETAILS_DARK: "DETAILS_DARK",
  DETAILS_LIGHT: "DETAILS_LIGHT",
};

function App() {
  const [view, setView] = useState(VIEWS.HOME_DARK);

  function renderView() {
    switch (view) {
      case VIEWS.HOME_LIGHT:
        return <HomeLight />;
      case VIEWS.DETAILS_DARK:
        return <DetailsDark />;
      case VIEWS.DETAILS_LIGHT:
        return <DetailsLight />;
      case VIEWS.HOME_DARK:
      default:
        return <HomeDark />;
    }
  }

  return (
    <div className="min-h-screen">
      <nav className="p-4 bg-transparent flex gap-2 items-center">
        <button
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            view === VIEWS.HOME_DARK ? "bg-white/10 text-white" : "bg-white/5 text-white/80"
          }`}
          onClick={() => setView(VIEWS.HOME_DARK)}
        >
          Home Dark
        </button>

        <button
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            view === VIEWS.HOME_LIGHT ? "bg-white/30 text-white" : "bg-white/10 text-white/80"
          }`}
          onClick={() => setView(VIEWS.HOME_LIGHT)}
        >
          Home Light
        </button>

        <button
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            view === VIEWS.DETAILS_DARK ? "bg-white/10 text-white" : "bg-white/5 text-white/80"
          }`}
          onClick={() => setView(VIEWS.DETAILS_DARK)}
        >
          Details Dark
        </button>

        <button
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            view === VIEWS.DETAILS_LIGHT ? "bg-white/30 text-white" : "bg-white/10 text-white/80"
          }`}
          onClick={() => setView(VIEWS.DETAILS_LIGHT)}
        >
          Details Light
        </button>
      </nav>

      <main>{renderView()}</main>
    </div>
  );
}

export default App;
