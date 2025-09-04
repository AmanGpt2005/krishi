"use client";
import { useEffect, useState } from "react";

export default function Weather() {
  const API_BASE = "https://api.weatherapi.com/v1/current.json";
  const API_KEY = "d56df21ff9684b4395f202905252908"; // Replace with env variable in prod

  // ✅ Default set to Kanpur, India
  const [city, setCity] = useState("Kanpur, India");
  const [data, setData] = useState(null);
  const [unit, setUnit] = useState("C");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (q) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}?key=${API_KEY}&q=${q}&aqi=yes`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError("Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const formatTemp = (c, f) =>
    unit === "C" ? `${Math.round(c)}°C` : `${Math.round(f)}°F`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-yellow-900 text-white relative overflow-hidden">
      {/* Aurora-like animated background */}
      <div className="absolute inset-0 bg-gradient-conic from-green-500/20 via-yellow-400/20 to-green-600/20 blur-3xl animate-pulse" />

      <div className="relative max-w-5xl mx-auto p-6">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-yellow-300">🌦 Weather Report</h1>
            <p className="text-green-200">Live updates with AQI</p>
          </div>

          {/* Search */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (city.trim()) fetchWeather(city);
            }}
            className="flex gap-2 bg-green-700/40 backdrop-blur-md border border-green-500/30 p-2 rounded-xl shadow-lg w-full md:w-1/2"
          >
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city..."
              className="flex-1 bg-transparent outline-none text-yellow-100 placeholder-yellow-200"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-green-500 text-green-900 font-bold rounded-lg hover:scale-105 transition"
            >
              Search
            </button>
          </form>
        </header>

        {/* Main Grid */}
        {loading ? (
          <div className="text-center text-yellow-300">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : data ? (
          <main className="grid md:grid-cols-2 gap-6">
            {/* Current Weather Card */}
            <section className="bg-green-700/30 border border-green-500/30 rounded-2xl p-6 shadow-xl backdrop-blur-lg">
              <h2 className="text-xl font-bold text-yellow-300 mb-2">
                {data.location.name}, {data.location.region || data.location.country}
              </h2>
              <p className="text-green-200 text-sm mb-4">
                Local time: {data.location.localtime}
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={`https:${data.current.condition.icon}`}
                  alt="weather icon"
                  className="w-16 h-16"
                />
                <div>
                  <div className="text-5xl font-extrabold text-yellow-200">
                    {formatTemp(data.current.temp_c, data.current.temp_f)}
                  </div>
                  <p className="text-green-200">{data.current.condition.text}</p>
                </div>
              </div>

              {/* Extra Info */}
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="bg-green-800/40 p-3 rounded-lg">
                  Feels like:{" "}
                  {unit === "C"
                    ? `${Math.round(data.current.feelslike_c)}°C`
                    : `${Math.round(data.current.feelslike_f)}°F`}
                </div>
                <div className="bg-green-800/40 p-3 rounded-lg">
                  Wind: {data.current.wind_kph} km/h {data.current.wind_dir}
                </div>
                <div className="bg-green-800/40 p-3 rounded-lg">
                  Humidity: {data.current.humidity}%
                </div>
                <div className="bg-green-800/40 p-3 rounded-lg">
                  Pressure: {data.current.pressure_mb} mb
                </div>
              </div>

              {/* Unit Toggle */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setUnit("C")}
                  className={`px-3 py-1 rounded-lg font-bold ${
                    unit === "C"
                      ? "bg-yellow-400 text-green-900"
                      : "bg-green-800/50 text-yellow-200"
                  }`}
                >
                  °C
                </button>
                <button
                  onClick={() => setUnit("F")}
                  className={`px-3 py-1 rounded-lg font-bold ${
                    unit === "F"
                      ? "bg-yellow-400 text-green-900"
                      : "bg-green-800/50 text-yellow-200"
                  }`}
                >
                  °F
                </button>
              </div>
            </section>

            {/* Air Quality Card */}
            <aside className="bg-green-700/30 border border-green-500/30 rounded-2xl p-6 shadow-xl backdrop-blur-lg">
              <h2 className="text-xl font-bold text-yellow-300 mb-4">Air Quality</h2>
              <p className="text-4xl font-extrabold text-yellow-200">
                {data.current.air_quality["us-epa-index"] || "—"}
              </p>
              <p className="text-green-200">
                AQI Status:{" "}
                {(() => {
                  const idx = data.current.air_quality["us-epa-index"];
                  const map = {
                    1: "Good",
                    2: "Moderate",
                    3: "Unhealthy for Sensitive Groups",
                    4: "Unhealthy",
                    5: "Very Unhealthy",
                    6: "Hazardous",
                  };
                  return map[idx] || "Unknown";
                })()}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="bg-green-800/40 p-2 rounded-lg">
                  PM2.5: {data.current.air_quality.pm2_5?.toFixed(1) || "—"} µg/m³
                </div>
                <div className="bg-green-800/40 p-2 rounded-lg">
                  PM10: {data.current.air_quality.pm10?.toFixed(1) || "—"} µg/m³
                </div>
                <div className="bg-green-800/40 p-2 rounded-lg">
                  O₃: {data.current.air_quality.o3?.toFixed(1) || "—"} µg/m³
                </div>
                <div className="bg-green-800/40 p-2 rounded-lg">
                  NO₂: {data.current.air_quality.no2?.toFixed(1) || "—"} µg/m³
                </div>
              </div>
            </aside>
          </main>
        ) : null}
      </div>
    </div>
  );
}
