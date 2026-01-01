import { useEffect, useMemo, useRef, useState } from "react";
import {
  fetchCurrentByCity,
  fetchForecastByCity,
  fetchCurrentByCoords,
  fetchForecastByCoords,
  toDailyForecast,
} from "../services/openWeather";

const DEFAULT_CITY = "Lagos";

const MAJOR_CITIES = ["Cairo", "London", "Sydney", "Tokyo", "Dubai"];

const roundTemp = (t) => (typeof t === "number" ? Math.round(t) : t);

const normalizeCurrent = (json) => {
  const w = json?.weather?.[0] || {};
  const main = json?.main || {};
  const wind = json?.wind || {};

  return {
    city: json?.name || "",
    country: json?.sys?.country || "",
    description: w?.description || "",
    main: w?.main || "",
    icon: w?.icon || "",
    temp: roundTemp(main?.temp),
    feelsLike: roundTemp(main?.feels_like),
    humidity: main?.humidity,
    pressure: main?.pressure,
    windSpeed: wind?.speed,
    dt: json?.dt,
  };
};

export default function useWeatherLogic() {
  const [query, setQuery] = useState("");
  const [activeCity, setActiveCity] = useState(DEFAULT_CITY);

  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [majorCities, setMajorCities] = useState([]); // array of normalized current for each city

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const lastReqId = useRef(0);

  const loadCity = async (city) => {
    const reqId = ++lastReqId.current;
    setLoading(true);
    setError("");

    try {
      const [curJson, fcJson] = await Promise.all([
        fetchCurrentByCity(city),
        fetchForecastByCity(city),
      ]);

      if (reqId !== lastReqId.current) return;

      setActiveCity(city);
      setCurrent(normalizeCurrent(curJson));
      setForecast(toDailyForecast(fcJson));

      localStorage.setItem("lastCity", city);
    } catch (e) {
      if (reqId !== lastReqId.current) return;
      setError(e?.message || "Something went wrong");
    } finally {
      if (reqId === lastReqId.current) setLoading(false);
    }
  };

  const loadCoords = async (lat, lon) => {
    const reqId = ++lastReqId.current;
    setLoading(true);
    setError("");

    try {
      const [curJson, fcJson] = await Promise.all([
        fetchCurrentByCoords(lat, lon),
        fetchForecastByCoords(lat, lon),
      ]);

      if (reqId !== lastReqId.current) return;

      const city = curJson?.name || "Current Location";
      setActiveCity(city);
      setCurrent(normalizeCurrent(curJson));
      setForecast(toDailyForecast(fcJson));

      localStorage.setItem("lastCity", city);
    } catch (e) {
      if (reqId !== lastReqId.current) return;
      setError(e?.message || "Could not fetch location weather");
    } finally {
      if (reqId === lastReqId.current) setLoading(false);
    }
  };

  const searchSubmit = async (e) => {
    e?.preventDefault?.();
    const city = query.trim();
    if (!city) return;
    await loadCity(city);
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported on this device");
      return;
    }
    setError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        loadCoords(latitude, longitude);
      },
      () => setError("Location permission denied"),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const selectMajorCity = (city) => {
    setQuery(city);
    loadCity(city);
  };

  // Load major cities in background
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const results = await Promise.all(
          MAJOR_CITIES.map(async (c) => {
            const j = await fetchCurrentByCity(c);
            return normalizeCurrent(j);
          })
        );
        if (!cancelled) setMajorCities(results);
      } catch {
        // ignore (not critical)
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  // Initial load - try location first, then fallback to saved/default city
  useEffect(() => {
    if (!navigator.geolocation) {
      // No geolocation support, use saved/default city
      const saved = localStorage.getItem("lastCity");
      loadCity(saved || DEFAULT_CITY);
      return;
    }

    // Try to get location automatically
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        loadCoords(latitude, longitude);
      },
      () => {
        // Location denied or failed, fallback to saved/default city
        const saved = localStorage.getItem("lastCity");
        loadCity(saved || DEFAULT_CITY);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(
    () => ({
      // state
      query,
      activeCity,
      current,
      forecast,
      majorCities,
      loading,
      error,

      // actions
      setQuery,
      searchSubmit,
      useMyLocation,
      selectMajorCity,
      reload: () => loadCity(activeCity),
    }),
    [query, activeCity, current, forecast, majorCities, loading, error]
  );
}
