# Tasks — Aplikacja do wyświetlania pogody

1. Projekt repozytorium
   - Utworzyć repozytorium i inicjalizować React + Javascript
2. Implementacja UI podstawowego
   - Zbudować SearchBar, CurrentWeatherCard, ForecastList
3. Integracja z API pogodowym
   - Dodać src/services/weatherApi.js (obsługa OpenWeatherMap)
   - Obsłużyć błędy i loading
4. Caching i geolokalizacja
   - Dodać krótkoterminowy cache (TTL)
   - Dodać opcję użycia geolokalizacji
5. Backend proxy (opcjonalnie)
   - Prosty endpoint do przekazywania zapytań z ukrytym kluczem API
6. Testy i linter
   - Dodać ESLint, Prettier i kilka testów jednostkowych
7. Deployment
   - Deploy na Vercel/Netlify; dodać instrukcje w README

Proponowane rozbicie na TODOs (do zaimportowania do systemu tasków):
- repo-init: Inicjalizacja repo i ustawienie Vite
- folder-structure: Utwórz strukturę folderów projektu Vite
- ui-basic: Implementacja podstawowych komponentów UI
- api-integration: Podłączenie OpenWeatherMap i przetwarzanie wyników
- caching-geo: Implementacja cache i geolokalizacji
- backend-proxy: (opcjonalne) Proxy dla klucza API
- ci-cd: Lintery, testy, deploy
