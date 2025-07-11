import axios from 'axios';


const apiUrl = 'http://localhost:5225'; 

const api = axios.create({
  baseURL: apiUrl,
});

export default api;