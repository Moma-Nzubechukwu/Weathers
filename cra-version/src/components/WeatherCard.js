export default function WeatherCard({ city, temp, desc }) {
  return (
    <div className="card p-6 w-full max-w-sm text-center">
      <h2 className="text-2xl font-bold">{city}</h2>
      <p className="text-5xl font-extrabold mt-2">{temp}°</p>
      <p className="capitalize text-lg mt-2">{desc}</p>
      <div className="mt-4 flex justify-center space-x-3">
        <button className="px-4 py-2 bg-white/10 rounded-xl">Hourly</button>
        <button className="px-4 py-2 bg-white/10 rounded-xl">Weekly</button>
      </div>
    </div>
  );
}
