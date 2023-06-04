import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

const getAll = () => {
  return axios
    .get(baseUrl)
    .then((res) => res.data)
    .catch((error) => console.log("failed with error", error));
};

const create = (newObject) => {
  return axios
    .post(baseUrl, newObject)
    .then((res) => res.data)
    .catch((error) => console.log("failed with error", error));
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then((res) => res.data);
};

export default {
  getAll,
  create,
  update,
};
