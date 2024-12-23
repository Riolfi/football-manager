const express = require('express');
const { getTeams } = require('../controllers/teamsController'); // Importa o controller

const router = express.Router();

router.get('/', getTeams); // Define o endpoint GET /api/teams

module.exports = router;
