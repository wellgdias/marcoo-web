import axios from 'axios';

const api = axios.create({
  baseURL: 'https://marcoo-bff.herokuapp.com/v1',
});

export default api;
