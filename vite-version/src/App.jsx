import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import { API_KEY, DEFAULT_CITY } from "./config";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  ...

import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import { API_KEY, DEFAULT_CITY } from "./config";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${DEFAULT_CITY}&aqi=no`
        );
        const data = await res.json();
        setWeather(data);
      } catch (e) {
        console.error("Error fetching current weather:", e);
      }
    }

    async function fetchForecast() {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${DEFAULT_CITY}&days=5&aqi=no&alerts=no`
        );
        const data = await res.json();
        if (data && data.forecast && data.forecast.forecastday) {
          setForecast(data.forecast.forecastday);
        }
      } catch (e) {
        console.error("Error fetching forecast:", e);
      }
    }

    fetchWeather();
    fetchForecast();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
      <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-6">
        Weather App
      </h1>

      {weather && weather.current ? (
        <WeatherCard
          city={weather.location.name}
          temp={Math.round(weather.current.temp_c)}
          desc={weather.current.condition.text}
        />
      ) : (
        <div className="card p-6 max-w-sm text-center">Loading...</div>
      )}

      <div className="grid gap-4 mt-6 w-full md:grid-cols-2 lg:grid-cols-3 max-w-4xl">
        {forecast.map((f, i) => (
          <ForecastCard
            key={i}
            date={f.date}
            temp={Math.round(f.day.avgtemp_c)}
            desc={f.day.condition.text}
          />
        ))}
      </div>
    </div>
  );
}

