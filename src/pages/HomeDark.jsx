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
    <div className="min-h-screen w-full bg-gradient-to-br from-[#002E78] to-[#160524] text-white px-16 py-12">

      {/* Header */}
      <div className="flex items-center justify-between px-2 mb-16">

        {/* Left side: Logo + Search */}
        <div className="flex items-center gap-6">

          {/* Logo */}
          <img src="/icons/cloud-sun.svg" alt="BCodeStack-Clouds logo" className="w-12" />

          {/* Search bar */}
          <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-xl w-[430px]">
            <svg className="w-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              placeholder="Search the clouds..."
              className="bg-transparent text-sm text-white/80 outline-none w-full"
            />
          </div>

        </div>

        {/* Right side: Date + Toggle + Text */}
        <div className="flex items-center gap-10 text-sm">

          {/* Date */}
          <p>Sun ,18 May</p>

          {/* Toggle */}
          <div onClick={toggleTheme} className="flex items-center gap-2 cursor-pointer">
            <div className="w-12 h-[22px] rounded-full bg-white/20 flex items-center px-[3px]">
              <div
                className={`w-[16px] h-[16px] bg-white rounded-full transition-all duration-300 ${
                  theme === "light" ? "translate-x-6" : ""
                }`}
              ></div>
            </div>
            <p>{theme === "dark" ? "Cloudy!" : "Sunny!"}</p>
          </div>

          {/* Right text */}
          <p className="text-white/70">
            The future looks <span className="font-semibold text-white">bright</span> — stay tuned!
          </p>

        </div>

      </div>

      {/* Body */}
      <div className="flex justify-between items-start">

        <div className="max-w-xl">
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
