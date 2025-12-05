import { useTheme } from "../context/ThemeContext";

export default function HomeDark() {
  const { theme, toggleTheme } = useTheme();

  const cities = [
    { name: "Cairo", temp1: "+31.2°", temp2: "+30.22°", status: "Clear cloud", icon: "/icons/sun.svg" },
    { name: "London", temp1: "+30.2°", temp2: "+29.12°", status: "Cloudy sky", icon: "/icons/cloud-sun.svg" },
    { name: "Sydney", temp1: "+31.2°", temp2: "+30.22°", status: "Clear cloud", icon: "/icons/sun.svg" },
    { name: "Tokyo", temp1: "+31.2°", temp2: "+30.22°", status: "Clear cloud", icon: "/icons/cloud-sun.svg" },
    { name: "Dubai", temp1: "+31.2°", temp2: "+30.22°", status: "Rainy street", icon: "/icons/cloud-sun.svg" },
  ];

  return (
    <div 
      className={`min-h-screen w-full text-white px-16 py-12 ${
        theme === "light" 
          ? "bg-gradient-to-br from-[#C48EF1] to-[#5076B4]" 
          : "bg-gradient-to-br from-[#002E78] to-[#160524]"
      }`}
      style={theme === "light" ? {
        background: "linear-gradient(135deg, #C48EF1 0%, #5076B4 100%)"
      } : {}}
    >

      {/* Header */}
      <div className="flex items-center justify-between px-2 mb-16">

        {/* Left side: Logo + Search */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <img src="/icons/cloud-sun.svg" alt="BCodeStack-Clouds logo" className="w-12" />

          {/* Search bar */}
          <div 
            className="flex items-center gap-3 px-6 py-3 rounded-2xl w-[430px]"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
              backdropFilter: "blur(8px)",
            }}
          >
            <svg 
              className={`w-5 h-5 ${theme === "light" ? "text-white opacity-100" : "opacity-80"}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              placeholder="Search the clouds..."
              className={`bg-transparent text-sm outline-none w-full ${
                theme === "light" 
                  ? "text-white placeholder-white" 
                  : "text-white/90 placeholder-white/60"
              }`}
              style={theme === "light" ? { color: "#ffffff" } : {}}
            />
          </div>
        </div>

        {/* Right side: Date + Toggle + Text */}
        <div className="flex items-center gap-10 text-sm">

          {/* Date */}
          <p>Sun ,18 May</p>

          {/* Toggle Switch */}
          <div 
            onClick={toggleTheme} 
            className="relative w-14 h-7 rounded-full cursor-pointer transition-all duration-300"
            style={{
              background: theme === "dark" 
                ? "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)"
                : "linear-gradient(180deg, rgba(255,215,74,0.8) 0%, rgba(255,183,77,0.8) 100%)"
            }}
          >
            <div
              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
                theme === "light" ? "translate-x-7" : ""
              }`}
            >
              {theme === "light" ? (
                <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-3 h-3 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </div>
          </div>

          {/* Right text */}
          <p className="text-white/70">
            The future looks <span className="font-semibold text-white">bright</span> — stay tuned!
          </p>

        </div>

      </div>

      {/* Body */}
      <div className="flex justify-between items-start mb-20">
        
        {/* Transparent Box for Writeup */}
        <div className="bg-white/10 rounded-xl p-8 max-w-2xl w-full border border-white/20">
          <h1 className="text-4xl font-semibold mb-4">Welcome to BCodeStack-Clouds</h1>

          <p className="text-white/80 leading-relaxed mb-2">
            At BCodeStack-Clouds, we believe weather should not just be data, it should be clear,
            beautiful, and useful.
          </p>

          <p className="text-white/80 leading-relaxed mb-6">
            This app was created to help you stay prepared for your day with accurate
            forecasts, stunning visuals, and smart features that make checking the weather
            feel less like a chore and more like a glance at the sky.
          </p>

          <p className="text-white/80 leading-relaxed">
            Whether you are planning a trip, dressing for the day, or just curious about
            the clouds above.
          </p>
        </div>

        <img src="/weather-icons/BCodeStack-Clouds-logo.png" className="w-64 opacity-90" />
      </div>

      {/* Cities */}
      <h2 className="text-xl font-semibold mt-20 mb-6">Major Cities Weather</h2>

      <div className="grid grid-cols-5 border border-white/20 rounded-xl overflow-hidden">

        {cities.map((city, index) => (
          <div
            key={city.name}
            className={`p-6 text-center border-r border-dotted border-white/20 ${
              index === 4 ? "border-r-0" : ""
            }`}
          >
            <h3 className="text-lg mb-3">{city.name}</h3>
            <img src={city.icon} alt={`${city.name} weather icon`} className="mx-auto w-16 mb-4" />
            <p>{city.temp1} {city.temp2}</p>
            <p className="text-sm text-white/70">{city.status}</p>
          </div>
        ))}

      </div>

      <p className="text-center text-white/40 mt-12 text-sm">
        © 2025 BCodeStack-Clouds. All rights reserved.
      </p>

    </div>
  );
}
