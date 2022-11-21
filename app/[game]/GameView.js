// GameView.js

'use client'

import { useMemo, useState } from "react"
import { useTeamContext } from "../context/teamContext"
import { blankStats } from "../utils/lib"
import Stats from "./Stats"

export default function GameView({ids}){
  
  const {gameId, awayId, homeId} = ids
  const initTeam = () => ({
    total: {...blankStats},
    lastEvent: { sequence: 0 },
    players: [],
  })

  const [awayTeam, setAwayTeam] = useState(() => initTeam())
  const [homeTeam, setHomeTeam] = useState(() => initTeam())
  const [inView, setInView] = useState(awayId)

  const { teams } = useTeamContext()

  const [awayTeamName, homeTeamName] = useMemo(() => (
    [awayId, homeId].map(teamId => (
      teams.find(team => team.teamId === teamId).teamName
    ))  
  ), [teams, awayId, homeId])
  
  const score = useMemo(() => `${awayTeam.total.Goal} - ${homeTeam.total.Goal}`, [awayTeam, homeTeam])

  return (
    <main>
      <div className="score" key={score}>{score}</div>
      <div className="teams">
        <TeamButton 
          teamName={awayTeamName} 
          onClick={() => setInView(awayId)} 
          inView={inView === awayId} 
        />
        <TeamButton 
          teamName={homeTeamName} 
          onClick={() => setInView(homeId)} 
          inView={inView === homeId} 
        />
      </div>
      <Stats
        inView={inView === awayId}
        path={`${gameId}/${awayId}`}
        setTeam={setAwayTeam}
        team={awayTeam}
      />
      <Stats
        inView={inView === homeId}
        path={`${gameId}/${homeId}`}
        setTeam={setHomeTeam}
        team={homeTeam}
      />
    </main>
  )
}

function TeamButton({teamName, onClick, inView}) {
  return (
    <div className={`button ${inView && 'inView'}`} onClick={onClick}>{teamName}</div>
  )
}