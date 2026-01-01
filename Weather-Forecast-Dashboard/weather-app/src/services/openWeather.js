const BASE = "https://api.openweathermap.org/data/2.5";

const getKey = () => {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY;
  if (!key) throw new Error("Missing VITE_OPENWEATHER_API_KEY in env");
  return key;
};

const getUnits = () => import.meta.env.VITE_OPENWEATHER_UNITS || "metric";

const buildUrl = (path, params = {}) => {
  const url = new URL(`${BASE}/${path}`);
  const key = getKey();
  const units = getUnits();

  url.searchParams.set("appid", key);
  url.searchParams.set("units", units);

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v).trim() !== "") {
      url.searchParams.set(k, v);
    }
  });

  return url.toString();
};

const safeFetch = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.message) msg = data.message;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
};

export const iconUrl = (iconCode) => {
  // If you have local icons in public/weather-icons:
  // return `/weather-icons/${iconCode}.png`;
  // Otherwise use OpenWeather icons:
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const fetchCurrentByCity = async (city) => {
  const url = buildUrl("weather", { q: city });
  return safeFetch(url);
};

export const fetchForecastByCity = async (city) => {
  const url = buildUrl("forecast", { q: city });
  return safeFetch(url);
};

export const fetchCurrentByCoords = async (lat, lon) => {
  const url = buildUrl("weather", { lat, lon });
  return safeFetch(url);
};

export const fetchForecastByCoords = async (lat, lon) => {
  const url = buildUrl("forecast", { lat, lon });
  return safeFetch(url);
};

// Convert OpenWeather /forecast (3-hour list) into 5 days summary
export const toDailyForecast = (forecastJson) => {
  const list = forecastJson?.list || [];
  const byDate = new Map();

  for (const item of list) {
    const date = item.dt_txt?.slice(0, 10); // "YYYY-MM-DD"
    if (!date) continue;

    const entry = byDate.get(date) || {
      date,
      temps: [],
      icons: [],
      descriptions: [],
    };

    entry.temps.push(item.main?.temp);
    entry.icons.push(item.weather?.[0]?.icon);
    entry.descriptions.push(item.weather?.[0]?.description);

    byDate.set(date, entry);
  }

  const days = Array.from(byDate.values()).slice(0, 5);

  return days.map((d) => {
    const temps = d.temps.filter((t) => typeof t === "number");
    const min = temps.length ? Math.min(...temps) : null;
    const max = temps.length ? Math.max(...temps) : null;

    // pick the most frequent icon/description
    const mostCommon = (arr) => {
      const freq = new Map();
      arr.forEach((x) => freq.set(x, (freq.get(x) || 0) + 1));
      let best = null;
      let bestCount = -1;
      for (const [k, c] of freq.entries()) {
        if (c > bestCount) {
          best = k;
          bestCount = c;
        }
      }
      return best;
    };

    return {
      date: d.date,
      min,
      max,
      icon: mostCommon(d.icons.filter(Boolean)),
      description: mostCommon(d.descriptions.filter(Boolean)),
    };
  });
};
