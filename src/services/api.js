import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendframeworkii-2.onrender.com/', // Altere conforme necessário
});

export default api;
