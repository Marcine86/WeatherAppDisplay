import { useState } from 'react'
import { useWeather } from './WeatherContext'

export default function SearchBar() {
  const [input, setInput] = useState('')
  const { fetchWeather, fetchWeatherByLocation, loading } = useWeather()

  const handleSearch = (e) => {
    e.preventDefault()
    if (input.trim()) {
      fetchWeather(input)
      setInput('')
    }
  }

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        fetchWeatherByLocation(latitude, longitude)
      })
    }
  }

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter city name..."
          className="flex-1 px-4 py-2 rounded-lg focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleGeolocation}
          className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100"
        >
          📍
        </button>
      </div>
    </form>
  )
}
