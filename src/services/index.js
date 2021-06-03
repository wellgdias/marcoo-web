import axios from 'axios';

const api = axios.create({
  baseURL: 'https://marcoo-bff.herokuapp.com',
});

export default api;
