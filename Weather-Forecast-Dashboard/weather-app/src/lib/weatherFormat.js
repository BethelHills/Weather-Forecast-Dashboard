export function pickIconCode(currentJson) {
  return currentJson?.weather?.[0]?.icon || "01d";
}

export function toCityCard(currentJson) {
  const name = currentJson?.name || "Unknown";
  const country = currentJson?.sys?.country || "";
  const desc = currentJson?.weather?.[0]?.description || "";
  const icon = pickIconCode(currentJson);
  const temp = Math.round(currentJson?.main?.temp ?? 0);
  const feelsLike = Math.round(currentJson?.main?.feels_like ?? 0);
  const humidity = currentJson?.main?.humidity ?? 0;
  const wind = currentJson?.wind?.speed ?? 0;

  return {
    name,
    country,
    desc,
    icon,
    temp,
    feelsLike,
    humidity,
    wind,
  };
}

/**
 * Make daily highs and lows from 3-hour forecast list
 */
export function toDailyForecast(forecastJson) {
  const list = Array.isArray(forecastJson?.list) ? forecastJson.list : [];
  const byDay = new Map();

  for (const item of list) {
    const dt = item?.dt;
    if (!dt) continue;
    const dayKey = new Date(dt * 1000).toISOString().slice(0, 10);

    const temp = item?.main?.temp;
    const icon = item?.weather?.[0]?.icon || "01d";
    const desc = item?.weather?.[0]?.description || "";

    if (!byDay.has(dayKey)) {
      byDay.set(dayKey, {
        dayKey,
        min: temp,
        max: temp,
        icon,
        desc,
      });
    } else {
      const d = byDay.get(dayKey);
      d.min = Math.min(d.min, temp);
      d.max = Math.max(d.max, temp);
    }
  }

  return Array.from(byDay.values())
    .slice(0, 5)
    .map((d) => ({
      dayKey: d.dayKey,
      min: Math.round(d.min ?? 0),
      max: Math.round(d.max ?? 0),
      icon: d.icon,
      desc: d.desc,
    }));
}
