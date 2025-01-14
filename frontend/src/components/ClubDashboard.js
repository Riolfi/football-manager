import React, { useEffect, useState } from 'react';
import api from '../services/api';
import PlayerList from './PlayerList';

function ClubDashboard({ teamId, onBack }) {
    const [teamInfo, setTeamInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTeamInfo() {
            try {
                const response = await api.get(`/clubs/info/${teamId}`);
                console.log("Informações do time recebidas:", response.data);
                setTeamInfo(response.data);
            } catch (error) {
                console.error("Erro ao buscar informações do time:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchTeamInfo();
    }, [teamId]);

    if (loading) return <p className="text-white text-xl text-center mt-20">Carregando informações do time...</p>;

    if (!teamInfo) return <p className="text-white text-xl text-center mt-20">Erro ao carregar informações do time.</p>;

    return (
        <div
            className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
            style={{ backgroundImage: "url('/background.jpg')" }}
        >
            {/* <button
                onClick={onBack}
                className="absolute top-5 left-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Voltar
            </button> */}

            <div className="text-center mb-6">
                <img src={teamInfo.logo} alt={teamInfo.nome} className="w-32 h-32 mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-white">{teamInfo.nome}</h1>
                <p className="text-white text-lg mt-2">{`Estádio: ${teamInfo.estadio} (${teamInfo.cidade})`}</p>
                <p className="text-white text-lg">{`Capacidade: ${teamInfo.capacidade} espectadores`}</p>
            </div>

            <div className="w-full max-w-4xl">
                <h2 className="text-2xl font-bold text-white mb-4">Jogadores</h2>
                <PlayerList teamId={teamId} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl p-4">
                <div className="bg-white bg-opacity-80 shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Resumo Financeiro</h2>
                    <p>Orçamento: R$ 100.000.000</p>
                </div>

                <div className="bg-white bg-opacity-80 shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Próxima Partida</h2>
                    <p>A próxima partida será exibida aqui...</p>
                </div>
            </div>

            <div className="mt-10 flex gap-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Escalação do Time
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Transferências
                </button>
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                    Ver Partidas
                </button>
            </div>
        </div>
    );
}

export default ClubDashboard;
