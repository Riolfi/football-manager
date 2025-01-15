import React, { useState } from 'react';

function TacticalBoard({ players }) {
    const [field, setField] = useState(Array(11).fill(null)); // 11 posições no campo
    const [bench, setBench] = useState(players); // Jogadores no banco de reservas

    // Atualizar banco de reservas sempre que `players` mudar
    React.useEffect(() => {
        setBench(players);
    }, [players]);

    const handleDrop = (player, position) => {
        const newField = [...field];
        newField[position] = player;

        const newBench = bench.filter((p) => p.id !== player.id);

        setField(newField);
        setBench(newBench);
    };

    const handleRemoveFromField = (position) => {
        const newField = [...field];
        const player = newField[position];
        newField[position] = null;

        setField(newField);
        setBench([...bench, player]);
    };

    return (
        <div className="flex">
            {/* Campo */}
            <div className="flex flex-col w-2/3 bg-green-500 p-4 rounded-lg relative mr-2"
                style={{ height: '600px' }}
            >
                <h2 className="text-center text-white text-lg mb-4">Esquema Tático</h2>
                <div className="grid grid-cols-3 gap-4 h-full">
                    {field.map((player, index) => (
                        <div
                            key={index}
                            className="relative bg-green-700 border border-white rounded-lg flex justify-center items-center h-20"
                            onDrop={(e) => {
                                e.preventDefault();
                                const playerData = JSON.parse(e.dataTransfer.getData('player'));
                                handleDrop(playerData, index);
                            }}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            {player ? (
                                <div
                                    className="text-center"
                                    draggable
                                    onDragStart={(e) =>
                                        e.dataTransfer.setData('player', JSON.stringify(player))
                                    }
                                    onDoubleClick={() => handleRemoveFromField(index)}
                                >
                                    <img
                                        src={player.foto}
                                        alt={player.nome}
                                        className="w-12 h-12 rounded-full mx-auto"
                                    />
                                    <p className="text-white text-sm">{player.nome}</p>
                                </div>
                            ) : (
                                <p className="text-gray-400">Arraste um jogador</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Lista Lateral */}
            <div className="w-1/3 bg-gray-800 p-4 rounded-lg"
                style={{ height: '600px', overflowY: 'auto' }}
            >
                <h2 className="text-white text-lg mb-4">Reservas</h2>
                <div className="flex flex-col gap-2">
                    {bench.map((player) => (
                        <div
                            key={player.id}
                            className="bg-gray-700 p-2 rounded-lg flex items-center gap-4"
                            draggable
                            onDragStart={(e) =>
                                e.dataTransfer.setData('player', JSON.stringify(player))
                            }
                        >
                            {/* <img
                                src={player.foto}
                                alt={player.nome}
                                className="w-12 h-12 rounded-full"
                            /> */}
                            <div className="text-white">
                                <p className="text-sm font-bold">{player.nome}</p>
                                <p className="text-sm">{player.posicao}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TacticalBoard;
