# Weather App Display - Implementation Code

This document contains all the code for the Weather App Display project organized by task.

## Task 1: Repo Setup ✓
Completed - Base configuration files created.

## Task 2: UI Components Implementation

### SearchBar.jsx
Search component for city lookup with geolocation support.

```jsx
import { useState } from 'react'
import { useWeather } from '../context/WeatherContext'

export default function SearchBar() {
  const [input, setInput] = useState('')
  const { fetchWeather, loading } = useWeather()

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
        fetchWeatherByCoords(latitude, longitude)
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
```

### CurrentWeatherCard.jsx
Displays current weather conditions for selected city.

```jsx
export default function CurrentWeatherCard({ weather }) {
  if (!weather) return null

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">{weather.name}, {weather.sys.country}</h2>
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
```

### ForecastList.jsx
Displays 5-day weather forecast.

```jsx
export default function ForecastList({ forecast }) {
  if (!forecast || forecast.length === 0) return null

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div key={index} className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="font-semibold">{new Date(day.dt * 1000).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600 my-2">{day.weather[0].main}</p>
            <p className="text-lg font-bold">{Math.round(day.main.temp)}°C</p>
            <p className="text-sm text-gray-600">💧 {day.main.humidity}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Task 3: API Integration

### weatherApi.js
Service to handle OpenWeatherMap API calls with caching.

```js
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
        units: 'metric'
      }
    })

    const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    })

    const data = {
      current: response.data,
      forecast: forecastResponse.data.list.filter((item, index) => index % 8 === 0)
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
        units: 'metric'
      }
    })

    const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric'
      }
    })

    return {
      current: response.data,
      forecast: forecastResponse.data.list.filter((item, index) => index % 8 === 0)
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch weather')
  }
}
```

## Task 4: Context & State Management

### WeatherContext.jsx
React Context for global weather state.

```jsx
import { createContext, useState, useCallback, useContext } from 'react'
import { fetchWeatherByCity, fetchWeatherByCoords } from '../services/weatherApi'

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
    <WeatherContext.Provider value={{ weather, loading, error, fetchWeather, fetchWeatherByLocation }}>
      {children}
    </WeatherContext.Provider>
  )
}

export function useWeather() {
  return useContext(WeatherContext)
}
```

## Task 5: Backend Proxy (Optional)

### weather-api-proxy.js (Node.js/Express)
Simple proxy to hide API key.

```js
import express from 'express'
import axios from 'axios'
import cors from 'cors'

const app = express()
app.use(cors())

const API_KEY = process.env.WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

app.get('/api/weather', async (req, res) => {
  const { q, lat, lon } = req.query

  try {
    const params = {
      appid: API_KEY,
      units: 'metric'
    }

    if (q) params.q = q
    if (lat && lon) {
      params.lat = lat
      params.lon = lon
    }

    const response = await axios.get(`${BASE_URL}/weather`, { params })
    res.json(response.data)
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
})

app.listen(3001, () => {
  console.log('Weather proxy running on port 3001')
})
```

## Task 6: Testing

### App.test.jsx
Basic unit tests.

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'
import { WeatherProvider } from '../context/WeatherContext'

describe('App', () => {
  it('renders search bar', () => {
    render(
      <WeatherProvider>
        <App />
      </WeatherProvider>
    )
    expect(screen.getByPlaceholderText(/city name/i)).toBeInTheDocument()
  })
})
```

## Environment Setup

Create `.env` file:
```
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

## Installation & Running

```bash
npm install
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run test         # Run tests
```

## Deployment

Deploy to Vercel/Netlify:
1. Connect repository
2. Set environment variable: `VITE_WEATHER_API_KEY`
3. Build command: `npm run build`
4. Output directory: `dist`
