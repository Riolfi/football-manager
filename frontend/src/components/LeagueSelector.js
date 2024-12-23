import React, { useEffect, useState } from 'react';
import api from '../services/api';

function LeagueSelector({ onLeagueSelect }) {
    const [leagues, setLeagues] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function fetchLeagues() {
            try {
                const response = await api.get('/leagues');
                setLeagues(response.data);
            } catch (error) {
                console.error("Erro ao buscar ligas:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchLeagues();
    }, []);

    if (loading) return <p className="text-gray-500 text-center">Carregando ligas...</p>;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-4">Escolha uma Liga</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {leagues.map(league => (
                    <li key={league.id} className="shadow-md rounded-lg p-4 bg-white flex flex-col items-center">
                        <img src={league.logo} alt={league.nome} className="w-16 mb-2" />
                        <button
                            onClick={() => onLeagueSelect(league.id)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            {league.nome} - {league.país}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LeagueSelector;
