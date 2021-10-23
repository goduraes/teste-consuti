import axios from 'axios';

const api = axios.create({
  baseURL: 'http://tst.sportibrasil.com.br/Services/',
});

export default api;