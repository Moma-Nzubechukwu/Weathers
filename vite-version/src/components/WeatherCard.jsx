export default function WeatherCard({ city, temp, desc }) {
  return (
    <div className="card p-6 w-full max-w-sm text-center">
      <h2 className="text-2xl font-bold">{city}</h2>
      <p className="text-5xl font-extrabold mt-2">{temp}°C</p>
      <p className="capitalize text-lg mt-2">{desc}</p>
    </div>
  );
}

