import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

const cache = new Map()

const getCacheKey = (city) => `weather_${city}`

const isCacheValid = (timestamp) => {
  return Date.now() - timestamp < CACHE_TTL
}

export const fetchWeatherByCity = async (city) => {
  const cacheKey = getCacheKey(city)

  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey)
    if (isCacheValid(timestamp)) {
      return data
    }
  }

  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    })

    const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    })

    const data = {
      current: response.data,
      forecast: forecastResponse.data.list.filter((item, index) => index % 8 === 0),
    }

    cache.set(cacheKey, { data, timestamp: Date.now() })
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch weather')
  }
}

export const fetchWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      },
    })

    const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      },
    })

    return {
      current: response.data,
      forecast: forecastResponse.data.list.filter((item, index) => index % 8 === 0),
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch weather')
  }
}
