import React, { useEffect, useState } from 'react';
import api from '../services/api';

function PlayerList({ teamId }) {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPlayers() {
            try {
                const response = await api.get(`/clubs/players/${teamId}`);
                console.log("Jogadores recebidos:", response.data);
                setPlayers(response.data);
            } catch (error) {
                console.error("Erro ao buscar jogadores:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPlayers();
    }, [teamId]);

    if (loading) {
        return <p className="text-white text-xl text-center mt-10">Carregando jogadores...</p>;
    }

    if (players.length === 0) {
        return <p className="text-white text-xl text-center mt-10">Nenhum jogador encontrado.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {players.map((player) => (
                <div
                    key={player.id}
                    className="bg-white bg-opacity-80 shadow-md rounded-lg p-4 text-center"
                >
                    <img
                        src={player.foto}
                        alt={player.nome}
                        className="w-20 h-20 mx-auto rounded-full mb-4"
                    />
                    <h3 className="text-lg font-bold">{player.nome}</h3>
                    <p className="text-sm">Idade: {player.idade}</p>
                    <p className="text-sm">Posição: {player.posicao}</p>
                    <p className="text-sm">Nacionalidade: {player.nacionalidade}</p>
                </div>
            ))}
        </div>
    );
}

export default PlayerList;
