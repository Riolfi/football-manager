const express = require('express');
const { getLeagues } = require('../controllers/leagueController');

const router = express.Router();

router.get('/', getLeagues);

module.exports = router;
