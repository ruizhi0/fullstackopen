import axios from "axios";
import Country from "../types/Country";

const BASE_URL = "https://restcountries.com/v3.1";

const findByName = (name: string): Promise<Country[]> => {
  return axios.get(`${BASE_URL}/name/${name}`).then((res) => {
    console.log("res", res);
    return res.data;
  });
};

export default {
  findByName,
};
