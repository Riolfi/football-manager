const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.get('/:id', async (req, res) => {
    const leagueId = req.params.id;
    const season = 2022; // Temporada fixa

    try {
        const response = await axios.get(
            `https://v3.football.api-sports.io/teams?league=${leagueId}&season=${season}`,
            {
                headers: { 'x-apisports-key': process.env.API_KEY },
            }
        );

        const clubes = response.data.response.map((team) => ({
            id: team.team.id,
            nome: team.team.name,
            logo: team.team.logo,
        }));

        res.json(clubes);
    } catch (error) {
        console.error("Erro ao buscar clubes:", error.message);
        res.status(500).json({ message: "Erro ao buscar clubes." });
    }
});

module.exports = router;
