import { useState, useEffect } from "react";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    fetch(
      "http://api.weatherapi.com/v1/forecast.json?key=5fddcb37d6f543f9946182609252708&q=Nsukka&days=3"
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data.current);
        setForecast(data.forecast.forecastday);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">🌤 Nsukka Weather</h1>
      {weather ? (
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <p className="text-xl">Temperature: {weather.temp_c}°C</p>
          <p>Condition: {weather.condition.text}</p>
          <img
            src={weather.condition.icon}
            alt={weather.condition.text}
            className="mx-auto"
          />

          <h2 className="text-lg font-bold mt-4">3-Day Forecast</h2>
          <div className="flex gap-4 mt-2">
            {forecast.map((day, idx) => (
              <div
                key={idx}
                className="bg-blue-50 p-3 rounded-lg shadow text-sm"
              >
                <p>{day.date}</p>
                <p>{day.day.avgtemp_c}°C</p>
                <img
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                  className="mx-auto"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
}

export default App;

