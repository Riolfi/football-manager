const axios = require('axios');
require('dotenv').config();

const getLeagues = async (req, res) => {
    try {
        const response = await axios.get('https://v3.football.api-sports.io/leagues', {
            headers: { 'x-apisports-key': process.env.API_KEY },
        });

        // Lista de países que possuem as ligas principais
        const principaisPaises = [
            'England',
            'Spain',
            'Italy',
            'Germany',
            'France',
            'Brazil',
            'Portugal',
            'Argentina',
            'Netherlands',
            'USA'
        ];

        // Filtrar ligas apenas da primeira divisão dos países principais
        const ligasFiltradas = response.data.response.filter(league => 
            league.league.type === 'League' && // Somente ligas (não copas)
            league.country.name && principaisPaises.includes(league.country.name) &&
            league.seasons.some(season => season.year === 2023) // Temporada 2023
        ).map(league => ({
            id: league.league.id,
            nome: league.league.name,
            país: league.country.name,
            logo: league.league.logo,
        }));

        res.json(ligasFiltradas);
        
    } catch (error) {
        res.status(500).json({
            message: "Erro ao buscar as ligas.",
            error: error.response?.data || error.message,
        });
    }
};

module.exports = { getLeagues };
