// GameView.js

'use client'

import { useMemo, useState } from "react"
import { useTeamContext } from "../context/teamContext"
import Stats from "./Stats"

export default function GameView({ids}){
  
  const {gameId, awayId, homeId} = ids
  const [awayScore, setAwayScore] = useState(0)
  const [homeScore, setHomeScore] = useState(0)
  const [inView, setInView] = useState(awayId)
  const { teams } = useTeamContext()

  const [awayTeamName, homeTeamName] = useMemo(() => (
    [awayId, homeId].map(teamId => (
      teams.find(team => team.teamId === teamId).teamName
    ))  
  ), [teams, awayId, homeId])

  return (
    <main>
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
        inView={inView === awayId}
        path={`${gameId}/${awayId}`}
        setScore={setAwayScore}
      />
      <Stats
        inView={inView === homeId}
        path={`${gameId}/${homeId}`}
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