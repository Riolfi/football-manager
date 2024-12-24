import React, { useState } from 'react';
import LeagueSelector from './components/LeagueSelector';
import TeamSelector from './components/TeamSelector';

function App() {
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);

    return (
        <div>
            {!selectedLeague ? (
                <LeagueSelector onLeagueSelect={setSelectedLeague} />
            ) : !selectedTeam ? (
                <TeamSelector leagueId={selectedLeague} onTeamSelect={setSelectedTeam} />
            ) : (
                <div>
                    <h2>Clube Selecionado!</h2>
                    <p>ID do Clube: {selectedTeam}</p>
                </div>
            )}
        </div>
    );
}

export default App;
