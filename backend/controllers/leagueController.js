const axios = require('axios');
require('dotenv').config();

const getLeagues = async (req, res) => {
    try {
        const response = await axios.get('https://v3.football.api-sports.io/leagues', {
            headers: { 'x-apisports-key': process.env.API_KEY },
        });

        const leagues = response.data.response.map(league => ({
            id: league.league.id,
            nome: league.league.name,
            país: league.country.name,
            logo: league.league.logo,
        }));

        res.json(leagues);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao buscar as ligas.",
            error: error.response?.data || error.message,
        });
    }
};

module.exports = { getLeagues };
