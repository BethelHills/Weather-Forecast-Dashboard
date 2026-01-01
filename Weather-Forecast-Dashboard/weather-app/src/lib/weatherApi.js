const BASE_URL = "https://api.openweathermap.org/data/2.5";

function getKey() {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY;
  if (!key) {
    throw new Error("Missing VITE_OPENWEATHER_API_KEY. Add it to weather-app/.env and Vercel env.");
  }
  return key;
}

function toQuery(params) {
  const q = new URLSearchParams(params);
  return q.toString();
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.message) msg = data.message;
    } catch (e) {
      // ignore
    }
    throw new Error(msg);
  }
  return res.json();
}

export async function getCurrentByCity(city) {
  const key = getKey();
  const url =
    `${BASE_URL}/weather?` +
    toQuery({
      q: city,
      appid: key,
      units: "metric",
    });
  return fetchJson(url);
}

export async function getCurrentByCoords(lat, lon) {
  const key = getKey();
  const url =
    `${BASE_URL}/weather?` +
    toQuery({
      lat: String(lat),
      lon: String(lon),
      appid: key,
      units: "metric",
    });
  return fetchJson(url);
}

/**
 * 5 day / 3 hour forecast. Good enough for daily cards.
 */
export async function getForecastByCoords(lat, lon) {
  const key = getKey();
  const url =
    `${BASE_URL}/forecast?` +
    toQuery({
      lat: String(lat),
      lon: String(lon),
      appid: key,
      units: "metric",
    });
  return fetchJson(url);
}
