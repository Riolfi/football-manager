const axios = require('axios');
require('dotenv').config();

const getPlayers = async (req, res) => {
    const { team_id } = req.query;

    if (!team_id) {
        return res.status(400).json({ message: "O parâmetro 'team_id' é obrigatório." });
    }

    try {
        const response = await axios.get('https://v3.football.api-sports.io/players', {
            headers: { 'x-apisports-key': process.env.API_KEY },
            params: { team: team_id, season: 2022 } // Use a temporada 2022
        });        

        const players = response.data.response.map(player => ({
            nome: player.player.name,
            idade: player.player.age,
            posicao: player.statistics[0]?.games.position || 'Desconhecida',
            foto: player.player.photo
        }));

        res.json(players);
    } catch (error) {
        res.status(500).json({
            message: "Erro ao buscar jogadores.",
            error: error.response?.data || error.message
        });
    }
};

module.exports = { getPlayers };