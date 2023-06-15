import axios from "axios";

const BASE_URL = "/api/persons";

const getAll = () => {
  return axios.get(BASE_URL).then((res) => res.data);
};

const create = (newContact) => {
  return axios.post(BASE_URL, newContact).then((res) => res.data);
};

const update = (contact) => {
  return axios
    .put(`${BASE_URL}/${contact.id}`, contact)
    .then((res) => res.data);
};

const remove = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export default { getAll, create, update, remove };
