const axios = require('axios');
require('dotenv').config();

const getLeagues = async (req, res) => {
    try {
        const response = await axios.get('https://v3.football.api-sports.io/leagues', {
            headers: { 'x-apisports-key': process.env.API_KEY },
        });

        // Lista de países com as ligas desejadas
        const ligasDesejadas = {
            'Brazil': 'Serie A',
            'France': 'Ligue 1',
            'England': 'Premier League',
            'Germany': 'Bundesliga',
            'Italy': 'Serie A',
            'Spain': 'La Liga',
            'Portugal': 'Primeira Liga',
            'Argentina': 'Primera Division'
        };

        // Filtrar apenas as ligas específicas para os países definidos
        const ligasFiltradas = response.data.response.filter(league =>
            league.league.type === 'League' && // Apenas ligas regulares
            ligasDesejadas[league.country.name] && // O país está na lista
            league.league.name === ligasDesejadas[league.country.name] // O nome da liga corresponde
        ).map(league => ({
            id: league.league.id,
            nome: league.league.name,
            país: league.country.name,
            logo: league.league.logo,
        }));

        // Retornar as ligas filtradas
        res.json(ligasFiltradas);
    } catch (error) {
        console.error("Erro ao buscar ligas:", error.message);
        res.status(500).json({ message: "Erro ao buscar ligas." });
    }
};

module.exports = { getLeagues };
