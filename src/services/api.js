import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/', // Altere conforme necessário
});

export default api;
