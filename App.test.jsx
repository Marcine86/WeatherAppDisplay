import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from '../src/App'
import { WeatherProvider } from '../src/context/WeatherContext'

// Mock the API
vi.mock('../src/services/weatherApi', () => ({
  fetchWeatherByCity: vi.fn(),
  fetchWeatherByCoords: vi.fn(),
}))

describe('Weather App', () => {
  it('renders the app title', () => {
    render(
      <WeatherProvider>
        <App />
      </WeatherProvider>
    )
    expect(screen.getByText(/Weather App/i)).toBeInTheDocument()
  })

  it('renders search bar', () => {
    render(
      <WeatherProvider>
        <App />
      </WeatherProvider>
    )
    const searchInput = screen.getByPlaceholderText(/city name/i)
    expect(searchInput).toBeInTheDocument()
  })

  it('shows initial message when no weather data', () => {
    render(
      <WeatherProvider>
        <App />
      </WeatherProvider>
    )
    expect(screen.getByText(/Search for a city/i)).toBeInTheDocument()
  })

  it('displays location button', () => {
    render(
      <WeatherProvider>
        <App />
      </WeatherProvider>
    )
    const geoButton = screen.getByRole('button', { name: /📍/i })
    expect(geoButton).toBeInTheDocument()
  })

  it('search button exists and is enabled', () => {
    render(
      <WeatherProvider>
        <App />
      </WeatherProvider>
    )
    const searchButton = screen.getByRole('button', { name: /Search/i })
    expect(searchButton).toBeInTheDocument()
    expect(searchButton).not.toBeDisabled()
  })
})
