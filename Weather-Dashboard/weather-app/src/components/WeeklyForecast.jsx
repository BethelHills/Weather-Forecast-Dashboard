import React from "react";

export default function WeeklyForecast({ days = [] }) {
  return (
    <div className="flex gap-3 overflow-x-auto py-3">
      {days.map((d, i) => (
        <div key={i} className="glass p-3 rounded-lg min-w-[120px] text-center">
          <div className="text-sm text-white/80">{d.day}</div>
          <div className="text-xl">{d.icon}</div>
          <div className="text-sm text-white/90">{d.temp}</div>
        </div>
      ))}
    </div>
  );
}
