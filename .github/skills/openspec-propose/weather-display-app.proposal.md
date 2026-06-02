# Aplikacja do wyświetlania pogody

Krótki opis:
Aplikacja webowa (responsive) pokazująca aktualną pogodę i prognozę dla wybranej lokalizacji.

Dlaczego:
- Umożliwia szybki podgląd pogody na urządzeniach mobilnych i desktopie.
- Dobre ćwiczenie integracji z zewnętrznym API pogodowym (np. OpenWeatherMap).

Główne cele:
- Wyświetlanie bieżącej temperatury, stanu pogody, wilgotności i wiatru.
- 5‑dniowa prognoza.
- Wyszukiwanie po nazwie miasta i geolokalizacja przeglądarki.

Zakres (in‑scope):
- Frontend: React + Vite, komponenty UI, responsywność.
- Integracja z API pogodowym (klucz API, caching krótkoterminowy).

Poza zakresem (out‑of‑scope):
- Rozbudowane konto użytkownika, długoterminowe przechowywanie danych.

Mierniki sukcesu:
- Aplikacja pokazuje poprawne dane pogodowe dla wpisanego miasta.
- Czas odpowiedzi poniżej 500ms (dla cache).
