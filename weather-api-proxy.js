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
      units: 'metric',
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

app.get('/api/forecast', async (req, res) => {
  const { q, lat, lon } = req.query

  try {
    const params = {
      appid: API_KEY,
      units: 'metric',
    }

    if (q) params.q = q
    if (lat && lon) {
      params.lat = lat
      params.lon = lon
    }

    const response = await axios.get(`${BASE_URL}/forecast`, { params })
    res.json(response.data)
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Weather proxy running on port ${PORT}`)
})
