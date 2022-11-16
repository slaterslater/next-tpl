// GameView.js

'use client'

import { useMemo, useState } from "react"
import Link from "next/link"
import { processGameEvents } from "../utils/lib"
import { useTeamContext } from "../context/teamContext"
import Stats from "./Stats"

export default function GameView({ids, awayEvents, homeEvents}){
  
  const {gameId, awayId, homeId} = ids
  const { teams } = useTeamContext()

  const [awayTeamName, homeTeamName] = useMemo(() => (
    [awayId, homeId].map(teamId => (
      teams.find(team => team.teamId === teamId).teamName
    ))  
  ), [teams, awayId, homeId])
  
  const awayGameData = useMemo(() => (
    processGameEvents(null, awayEvents)
  ), [awayEvents])
  
  const homeGameData = useMemo(() => (
    processGameEvents(null, homeEvents)
  ), [homeEvents])

  const [awayScore, setAwayScore] = useState(awayGameData.total.Goal)
  const [homeScore, setHomeScore] = useState(homeGameData.total.Goal)
  const [inView, setInView] = useState(awayId)

  return (
    <main>
      {/* <Link className="navBack" href='/'>&#x2715;</Link> */}
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
        data={awayGameData}
        setScore={setAwayScore}
      />
      <Stats
        gameId={gameId}
        teamId={homeId}
        inView={inView === homeId}
        data={homeGameData}
        setScore={setHomeScore}
      />
      <Link href='/'>back</Link>
    </main>
  )
}

function TeamButton({teamName, onClick, inView}) {
  return (
    <div className={`button ${inView && 'inView'}`} onClick={onClick}>{teamName}</div>
  )
}