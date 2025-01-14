import React, { useState } from 'react';
import LeagueSelector from './components/LeagueSelector';
import TeamSelector from './components/TeamSelector';
import ClubDashboard from './components/ClubDashboard';

function App() {
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);

    return (
        <div>
            {!selectedLeague ? (
                <LeagueSelector onLeagueSelect={setSelectedLeague} />
            ) : !selectedTeam ? (
                <TeamSelector 
                    leagueId={selectedLeague} 
                    onTeamSelect={setSelectedTeam} 
                    onBack={() => setSelectedLeague(null)}
                />
            ) : (
                <ClubDashboard
                    teamId={selectedTeam}
                    onBack={() => setSelectedTeam(null)}
                />
            )}
        </div>
    );
}

export default App;
