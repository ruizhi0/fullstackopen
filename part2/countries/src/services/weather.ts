import axios from "axios";
import WeatherInfo from "../types/WeatherInfo";

const BASE_URL = "https://api.openweathermap.org/data/3.0/onecall";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const getByLatLon = (lat: string, lon: string): Promise<WeatherInfo> => {
  return axios
    .get(
      `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${API_KEY}`
    )
    .then((res) => {
      console.log(res);
      return res.data;
    });
};

export default {
  getByLatLon,
};
