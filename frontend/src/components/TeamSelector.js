import React, { useEffect, useState } from 'react';
import api from '../services/api';

function TeamSelector({ leagueId, onTeamSelect, onBack }) {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTeams() {
            try {
                const response = await api.get(`/clubs/${leagueId}`);
                console.log("Clubes recebidos:", response.data);
                setTeams(response.data);
            } catch (error) {
                console.error("Erro ao buscar times:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTeams();
    }, [leagueId]);

    if (loading) return <p className="text-white text-xl text-center mt-20">Carregando clubes...</p>;

    return (
        <div
            className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
            style={{ backgroundImage: "url('/background.jpg')" }}
        >
            <h2 className="text-4xl font-bold mb-6 text-white drop-shadow-md">
                Escolha um Clube
            </h2>

            <button
                onClick={onBack}
                className="absolute top-5 left-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Voltar
            </button>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {teams.map((team) => (
                    <li
                        key={team.id}
                        className="bg-white bg-opacity-80 shadow-md rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition"
                    >
                        <img
                            src={team.logo}
                            alt={team.nome}
                            className="w-20 h-20 object-contain mb-3"
                        />
                        <button
                            onClick={() => onTeamSelect(team.id)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            {team.nome}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TeamSelector;
