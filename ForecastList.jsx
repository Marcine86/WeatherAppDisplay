export default function ForecastList({ forecast }) {
  if (!forecast || forecast.length === 0) return null

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div key={index} className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="font-semibold">
              {new Date(day.dt * 1000).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 my-2">{day.weather[0].main}</p>
            <p className="text-lg font-bold">{Math.round(day.main.temp)}°C</p>
            <p className="text-sm text-gray-600">💧 {day.main.humidity}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}
