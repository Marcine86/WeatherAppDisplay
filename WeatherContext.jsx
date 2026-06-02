import { createContext, useState, useCallback, useContext } from 'react'
import { fetchWeatherByCity, fetchWeatherByCoords } from './weatherApi'

const WeatherContext = createContext()

export function WeatherProvider({ children }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeather = useCallback(async (city) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchWeatherByCity(city)
      setWeather(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchWeatherByLocation = useCallback(async (lat, lon) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchWeatherByCoords(lat, lon)
      setWeather(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <WeatherContext.Provider
      value={{ weather, loading, error, fetchWeather, fetchWeatherByLocation }}
    >
      {children}
    </WeatherContext.Provider>
  )
}

export function useWeather() {
  return useContext(WeatherContext)
}

export default WeatherContext
