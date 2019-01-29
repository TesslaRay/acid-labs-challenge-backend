# Acid Labs Challenge - Backend

API that through third-party services, geocoding API, Restcountries API and Darksky API; Obtain the meteorological information of a capital of a country from latitude/longitude values.

Note: It has a dependency of Redis that is included in docker-compose manifest.

## API

`GET /api/weather?latitude&longitude&lang`

### Query params

|Name|Type|
|---|---|
|latitude|number|
|longitude|number|
|string|number|

### Response with status 200

|Name|Type|
|---|---|
|cached|bool|
|capital|string|
|country|string|
|icon|string|
|latitude|number|
|longitude|number|
|summary|string|
|temperature|number|

### Response Example 
```JSON
{
  "cached": false,
  "capital": "washington, d.c.",
  "country": "United States",
  "icon": "partly-cloudy-day",
  "latitude": 38.9071923,
  "longitude": -77.0368707,
  "summary": "Mayormente Nublado",
  "temperature": 0.67,
}
```

Develop Commands
========

`yarn start`: run in development mode.


Docker Commands
========

`docker build -t acid-backend .`: build docker.

`docker run -it -p 3000:3000 acid-backend`: run docker.