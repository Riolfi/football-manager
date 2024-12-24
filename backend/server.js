const express = require('express');
const cors = require('cors');
require('dotenv').config();

const playersRoutes = require('./routes/players'); // Importa as rotas de players
const teamsRoutes = require('./routes/teams'); // Importa a rota de times
const leaguesRoutes = require('./routes/leagues');
const clubsRoutes = require('./routes/clubs');


const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota inicial para testar
app.get('/', (req, res) => {
    res.send("Servidor rodando!");
});

// Rotas de jogadores
app.use('/api/players', playersRoutes);
// Rotas de times
app.use('/api/teams', teamsRoutes); // Usa a rota /api/teams
// Rotas de ligas
app.use('/api/leagues', leaguesRoutes);
// Rotas de clubes
app.use('/api/clubs', clubsRoutes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

const axios = require('axios');

async function testAPI() {
    try {
        const response = await axios.get('https://v3.football.api-sports.io/status', {
            headers: {
                'x-apisports-key': process.env.API_KEY, // API KEY vinda do .env
            },
        });
        console.log("Resposta da API:", response.data);
    } catch (error) {
        console.error("Erro ao conectar na API:", error.response?.data || error.message);
    }
}

testAPI();
