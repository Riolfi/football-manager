import React, { useEffect, useState } from 'react';
import api from '../services/api';

function TeamSelector({ leagueId, onTeamSelect }) {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTeams() {
            try {
                const response = await api.get('/teams', {
                    params: { league_id: leagueId, season: 2022 },
                });
                setTeams(response.data);
            } catch (error) {
                console.error('Erro ao carregar times:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchTeams();
    }, [leagueId]);

    if (loading) return <p>Carregando times...</p>;

    return (
        <div>
            <h2>Escolha um Clube</h2>
            <ul>
                {teams.map(team => (
                    <li key={team.id}>
                        <button onClick={() => onTeamSelect(team.id)}>
                            <img src={team.logo} alt={team.nome} width="50" />
                            {team.nome}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TeamSelector;
