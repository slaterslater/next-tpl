// GameView.js

'use client'

import { useMemo, useState } from "react"
import Link from "next/link"
import { countGoals } from "../utils/lib"
import { useTeamContext } from "../context/teamContext"
import Stats from "./Stats"

export default function GameView({ids, awayEvents, homeEvents}){
  const {gameId, awayId, homeId} = ids
  const [awayScore, setAwayScore] = useState(() => countGoals(awayEvents))
  const [homeScore, setHomeScore] = useState(() => countGoals(homeEvents))
  const [inView, setInView] = useState(awayId)

  const { teams } = useTeamContext()
  const [awayTeamName, homeTeamName] = useMemo(() => (
    [awayId, homeId].map(teamId => (
      teams.find(team => team.teamId === teamId).teamName
    ))  
  ), [teams, awayId, homeId])
  
  return (
    <main>
      <Link className="navBack" href='/'>&#x2715;</Link>
      <div className="score">{`${awayScore} - ${homeScore}`}</div>
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
        gameId={gameId}
        teamId={awayId}
        inView={inView === awayId}
        events={awayEvents}
        setScore={setAwayScore}
      />
      <Stats
        gameId={gameId}
        teamId={homeId}
        inView={inView === homeId}
        events={homeEvents}
        setScore={setHomeScore}
      />
    </main>
  )
}

function TeamButton({teamName, onClick, inView}) {
  return (
    <div className={`button ${inView && 'inView'}`} onClick={onClick}>{teamName}</div>
  )
}