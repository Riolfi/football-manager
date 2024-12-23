const express = require('express');
const { getPlayers } = require('../controllers/playersController'); // Controller com a lógica

const router = express.Router();

router.get('/', getPlayers); // Define a rota GET para buscar jogadores

module.exports = router;
