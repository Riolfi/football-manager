const axios = require('axios');
require('dotenv').config();

const apiFootball = axios.create({
  baseURL: 'https://v3.football.api-sports.io/',
  headers: {
    'x-apisports-key': process.env.API_KEY, // Sua API KEY do .env
  },
});

module.exports = apiFootball;
