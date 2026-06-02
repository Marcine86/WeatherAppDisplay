import { useWeather } from './WeatherContext'
import SearchBar from './SearchBar'
import CurrentWeatherCard from './CurrentWeatherCard'
import ForecastList from './ForecastList'

function App() {
  const { weather, loading, error } = useWeather()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Weather App</h1>
        <SearchBar />

        {loading && (
          <div className="text-center py-8">
            <p className="text-white text-lg">Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
            <p>{error}</p>
          </div>
        )}

        {weather && !loading && (
          <>
            <CurrentWeatherCard weather={weather.current} />
            <ForecastList forecast={weather.forecast} />
          </>
        )}

        {!weather && !loading && !error && (
          <div className="text-center py-8">
            <p className="text-white text-lg">Search for a city to see the weather</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
