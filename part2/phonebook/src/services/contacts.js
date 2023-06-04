import axios from "axios";

const BASE_URL = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(BASE_URL).then((res) => res.data);
};

const create = (newContact) => {
  return axios.post(BASE_URL, newContact).then((res) => res.data);
};

const remove = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export default { getAll, create, remove };
