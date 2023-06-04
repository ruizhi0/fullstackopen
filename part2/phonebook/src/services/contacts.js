import axios from "axios";

const BASE_URL = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(BASE_URL).then((res) => res.data);
};

const create = (newContact) => {
  return axios.post(BASE_URL, newContact).then((res) => res.data);
};

export default { getAll, create };
