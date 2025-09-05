export default function ForecastCard({ date, temp, desc }) {
  const day = new Date(date).toLocaleDateString("en-US", { weekday: "short" });
  return (
    <div className="card p-4 flex flex-col items-center">
      <p className="text-lg font-semibold">{day}</p>
      <p className="text-2xl mt-2">{temp}°</p>
      <p className="capitalize text-sm">{desc}</p>
    </div>
  );
}
