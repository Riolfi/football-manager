import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Atualize a porta aqui
});

export default api;