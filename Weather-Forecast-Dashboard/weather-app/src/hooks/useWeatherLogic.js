import { useEffect, useMemo, useState } from "react";
import { getCurrentByCity, getCurrentByCoords, getForecastByCoords } from "../lib/weatherApi";
import { toCityCard, toDailyForecast } from "../lib/weatherFormat";

const CACHE_KEY = "bcs_weather_cache_v1";
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.ts) return null;
    if (Date.now() - parsed.ts > CACHE_TTL_MS) return null;
    return parsed;
  } catch (e) {
    return null;
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), ...data }));
  } catch (e) {
    // ignore
  }
}

export function useWeatherLogic() {
  const majorCities = useMemo(
    () => ["Cairo", "London", "Sydney", "Tokyo", "Dubai"],
    []
  );

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Main displayed city weather (search or location)
  const [current, setCurrent] = useState(null); // CityCard
  const [forecast, setForecast] = useState([]); // daily

  // Major cities cards
  const [majorCards, setMajorCards] = useState([]);

  async function loadMajorCities() {
    try {
      const results = await Promise.all(
        majorCities.map(async (c) => {
          const json = await getCurrentByCity(c);
          return toCityCard(json);
        })
      );
      setMajorCards(results);
      writeCache({ majorCards: results });
    } catch (e) {
      // do not block app for this
    }
  }

  async function loadByCity(cityName) {
    setError("");
    setLoading(true);
    try {
      const json = await getCurrentByCity(cityName);
      const card = toCityCard(json);
      setCurrent(card);

      // forecast by coord
      const lat = json?.coord?.lat;
      const lon = json?.coord?.lon;
      if (typeof lat === "number" && typeof lon === "number") {
        const f = await getForecastByCoords(lat, lon);
        setForecast(toDailyForecast(f));
      } else {
        setForecast([]);
      }

      writeCache({ current: card, forecast: forecast });
    } catch (e) {
      setError(e?.message || "Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  }

  async function loadByLocation() {
    setError("");
    setLoading(true);

    const getPos = () =>
      new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation not supported on this device."));
          return;
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos),
          () => reject(new Error("Location permission denied. Search a city instead.")),
          { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
        );
      });

    try {
      const pos = await getPos();
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const json = await getCurrentByCoords(lat, lon);
      const card = toCityCard(json);
      setCurrent(card);

      const f = await getForecastByCoords(lat, lon);
      setForecast(toDailyForecast(f));

      writeCache({ current: card, forecast: forecast });
    } catch (e) {
      setError(e?.message || "Failed to get location weather");
    } finally {
      setLoading(false);
    }
  }

  function onSubmitSearch(e) {
    e?.preventDefault?.();
    const city = query.trim();
    if (!city) return;
    loadByCity(city);
  }

  // Bootstrap: use cache first, then refresh
  useEffect(() => {
    const cached = readCache();
    if (cached?.current) setCurrent(cached.current);
    if (Array.isArray(cached?.forecast)) setForecast(cached.forecast);
    if (Array.isArray(cached?.majorCards)) setMajorCards(cached.majorCards);

    // Always refresh major cities once
    loadMajorCities();

    // Auto load location if no cached current city
    if (!cached?.current) {
      loadByLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    query,
    setQuery,
    loading,
    error,
    current,
    forecast,
    majorCards,
    onSubmitSearch,
    loadByLocation,
    loadByCity,
  };
}
