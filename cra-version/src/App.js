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
          `https://api.openweathermap.org/data/2.5/weather?q=${DEFAULT_CITY}&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();
        setWeather(data);
      } catch (e) {
        console.error(e);
      }
    }
    async function fetchForecast() {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${DEFAULT_CITY}&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();
        if (data && data.list) {
          setForecast(data.list.filter((_, i) => i % 8 === 0));
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchWeather();
    fetchForecast();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <h1 className="text-xl font-semibold mb-4">Weather — CRA</h1>
      {weather && weather.main ? (
        <WeatherCard
          city={weather.name}
          temp={Math.round(weather.main.temp)}
          desc={weather.weather[0].description}
        />
      ) : (
        <div className="card p-6 max-w-sm text-center">Loading...</div>
      )}

      <div className="grid gap-4 mt-6 w-full md:grid-cols-2 lg:grid-cols-3 max-w-4xl">
        {forecast.map((f, i) => (
          <ForecastCard
            key={i}
            date={f.dt_txt}
            temp={Math.round(f.main.temp)}
            desc={f.weather[0].description}
          />
        ))}
      </div>
      <p className="mt-6 text-sm text-white/70">Insert your OpenWeatherMap API key in <code>src/config.js</code></p>
    </div>
  );
}
