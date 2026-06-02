export default function CurrentWeatherCard({ weather }) {
  if (!weather) return null

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">
        {weather.name}, {weather.sys.country}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-gray-600">Temperature</p>
          <p className="text-3xl font-bold">{Math.round(weather.main.temp)}°C</p>
        </div>
        <div>
          <p className="text-gray-600">Humidity</p>
          <p className="text-3xl font-bold">{weather.main.humidity}%</p>
        </div>
        <div>
          <p className="text-gray-600">Wind Speed</p>
          <p className="text-3xl font-bold">{Math.round(weather.wind.speed)} m/s</p>
        </div>
        <div>
          <p className="text-gray-600">Condition</p>
          <p className="text-xl font-bold capitalize">{weather.weather[0].main}</p>
        </div>
      </div>
    </div>
  )
}
