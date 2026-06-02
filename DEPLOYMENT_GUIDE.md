# Weather App Display - Deployment Guide

## Prerequisites
- Node.js 18+
- npm or yarn
- OpenWeatherMap API key (free tier available at https://openweathermap.org/api)

## Environment Variables

Create `.env` file in project root:
```
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

For backend proxy:
```
WEATHER_API_KEY=your_openweathermap_api_key
PORT=3001
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens at http://localhost:3000

## Production Build

```bash
npm run build
npm run preview
```

## Testing

```bash
npm run test
```

## Linting & Formatting

```bash
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
npm run format      # Format code with Prettier
```

## Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Set environment variables:
   - `VITE_WEATHER_API_KEY` = your API key
4. Deploy (auto-deploy on push)

## Deploy to Netlify

1. Push code to GitHub
2. Connect repo in Netlify dashboard
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variable: `VITE_WEATHER_API_KEY`
6. Deploy

## Deploy Backend Proxy (Optional)

For Vercel Functions (serverless):

1. Create `api/weather.js`:
```js
import axios from 'axios'

export default async function handler(req, res) {
  const { q, lat, lon } = req.query
  const API_KEY = process.env.WEATHER_API_KEY

  try {
    const params = { appid: API_KEY, units: 'metric' }
    if (q) params.q = q
    if (lat && lon) { params.lat = lat; params.lon = lon }

    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', { params })
    res.status(200).json(response.data)
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}
```

2. Update frontend to use: `https://yourdomain.vercel.app/api/weather`

## Performance Notes

- API responses cached for 10 minutes to reduce requests
- Minified bundle ~50KB (with deps)
- Uses Tailwind CSS for optimized styling
- Responsive design works on all screen sizes

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Features

✅ Search weather by city
✅ Geolocation support
✅ Current weather display
✅ 5-day forecast
✅ Responsive design
✅ Error handling
✅ Loading states
✅ API response caching

## Troubleshooting

**"API key not found"**
- Check `.env` file exists
- Ensure `VITE_` prefix for frontend env vars
- Restart dev server after changing .env

**"Failed to fetch weather"**
- Verify API key is valid
- Check city name spelling
- Ensure OpenWeatherMap API is accessible

**Geolocation not working**
- Only works on HTTPS or localhost
- User must grant browser permission
- Check browser console for errors
