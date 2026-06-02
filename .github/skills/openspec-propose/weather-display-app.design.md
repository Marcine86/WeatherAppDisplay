# Design — Aplikacja do wyświetlania pogody

Technologie:
- Frontend: React (Vite) + Javascript
- Stylizacja: Tailwind CSS
- Backend (opcjonalny): lekki proxy w Node.js/Express lub serverless (Vercel Functions) do ukrycia klucza API
- API pogodowe: OpenWeatherMap (Current Weather + 3 day forecast)

Architektura:
1. Komponenty: SearchBar, CurrentWeatherCard, ForecastList, Settings
2. Flow: użytkownik wpisuje miasto → wywołanie API → zapis do stanu (React Context / Zustand) → render
3. Caching: in-memory (lokalny cache z TTL) + opcjonalny service worker

Bezpieczeństwo:
- Nie umieszczać klucza API w publicznym repo — użyć backend proxy lub env vars w hostingu.

Dostępność i lokalizacja:
- Teksty w plikach i18n (PL, EN)
- Kontrast i obsługa klawiatury

Pliki kluczowe:
- src/App.js, src/components/, src/services/weatherApi.js, public/index.html
