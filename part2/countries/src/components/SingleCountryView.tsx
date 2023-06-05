import Country from "../types/Country";
import WeatherInfo from "../types/WeatherInfo";
import weatherService from "../services/weather";
import { useEffect, useState } from "react";

const SingleCountryView = ({ country }: { country: Country | null }) => {
  if (!country) {
    return null;
  }

  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);

  useEffect(() => {
    var lat = country.latlng[0];
    var lon = country.latlng[1];
    weatherService.getByLatLon(lat, lon).then((w) => setWeatherInfo(w));
  }, []);

  return (
    <div>
      <h1>{country.name.common}</h1>

      <div>capital {country.capital}</div>
      <div>area {country.area}</div>

      <p>
        <strong>languages:</strong>
      </p>
      <ul>
        {Object.values(country.languages).map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>

      <img
        src={country.flags.svg}
        alt={country.flags.alt}
        width="200"
        height="auto"
      />

      <h2>Weather in {country.name.common}</h2>
      <p>temperature {weatherInfo?.current.temp}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherInfo?.current.weather[0].icon}@2x.png`}
        alt={weatherInfo?.current.weather[0].description}
      />
      <p>wind {weatherInfo?.current.wind_speed} m/s</p>
    </div>
  );
};

export default SingleCountryView;
