const axios = require('axios');
require('dotenv').config();

const getTeams = async (req, res) => {
    const { league_id, season } = req.query;

    if (!league_id || !season) {
        return res.status(400).json({ message: "Os parâmetros 'league_id' e 'season' são obrigatórios." });
    }

    try {
        // Fazendo a requisição para buscar times de uma liga
        const response = await axios.get('https://v3.football.api-sports.io/teams', {
            headers: { 'x-apisports-key': process.env.API_KEY },
            params: { league: league_id, season: season }
        });

        // Formatando os dados retornados
        const teams = response.data.response.map(team => ({
            id: team.team.id,
            nome: team.team.name,
            logo: team.team.logo,
            país: team.team.country
        }));

        res.json(teams); // Retorna a lista formatada de times
    } catch (error) {
        res.status(500).json({
            message: "Erro ao buscar times.",
            error: error.response?.data || error.message
        });
    }
};

module.exports = { getTeams };
