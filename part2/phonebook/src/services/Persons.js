import axios from 'axios';
const baseUrl =
  'https://peaceful-shelf-14414-c1b424c5f661.herokuapp.com/api/persons';

const getAllPersons = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createPerson = (personObject) => {
  const request = axios.post(baseUrl, personObject);
  return request.then((response) => response.data);
};

const updatePerson = (id, personObject) => {
  const request = axios.put(`${baseUrl}/${id}`, personObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const api = { getAllPersons, createPerson, updatePerson, deletePerson };

export default api;
