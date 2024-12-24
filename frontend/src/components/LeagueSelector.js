import React, { useEffect, useState } from 'react';
import api from '../services/api';

function LeagueSelector({ onLeagueSelect }) {
    const [leagues, setLeagues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLeagues() {
            try {
                const response = await api.get('/leagues'); // Endpoint do backend
                setLeagues(response.data);
            } catch (error) {
                console.error("Erro ao buscar ligas:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchLeagues();
    }, []);

    if (loading) return <p>Carregando ligas...</p>;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center"
        style={{ backgroundImage: "url('/background.jpg')" }} // Substitua pela imagem do plano de fundo
        >
            <h2 className="text-3xl font-bold mb-6">Escolha uma Liga</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {leagues.map((league) => (
                    <li
                        key={league.id}
                        className="shadow-md rounded-lg p-4 bg-white flex flex-col items-center"
                    >
                        <img
                            src={league.logo}
                            alt={league.nome}
                            className="w-16 h-16 object-contain mb-3"
                        />
                        <button
                            onClick={() => onLeagueSelect(league.id)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            {league.nome}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LeagueSelector;
