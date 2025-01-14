const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// Rota para buscar os clubes de uma liga
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

// Nova rota para buscar informações detalhadas de um time
router.get('/info/:id', async (req, res) => {
    const teamId = req.params.id;

    try {
        const response = await axios.get(
            `https://v3.football.api-sports.io/teams?id=${teamId}`,
            {
                headers: { 'x-apisports-key': process.env.API_KEY },
            }
        );

        const team = response.data.response[0].team; // Informações do time
        const venue = response.data.response[0].venue; // Informações do estádio

        res.json({
            id: team.id,
            nome: team.name,
            logo: team.logo,
            estadio: venue.name,
            cidade: venue.city,
            capacidade: venue.capacity,
        });
    } catch (error) {
        console.error("Erro ao buscar informações do time:", error.message);
        res.status(500).json({ message: "Erro ao buscar informações do time." });
    }
});

module.exports = router;
