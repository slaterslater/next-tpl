// [game]/page.js

'use client'

import Link from "next/link"
import { useState } from "react"
import { useGameContext } from "../context/teamContext"
import { initTeam } from "../utils/lib"
import Stats from "./Stats"

export default function GamePage() {

  const {teams, game} = useGameContext()
  const {gameId, awayId, homeId, gameTimeEnd} = game

  const [inView, setInView] = useState(awayId)
  const [awayTeam, setAwayTeam] = useState(() => initTeam())
  const [homeTeam, setHomeTeam] = useState(() => initTeam())

  const score = `${awayTeam.total.Goal} - ${homeTeam.total.Goal}`

  return (
    <main>
      <div className="score" key={score}>{score}</div>
      <div className="teams">
        {[awayId, homeId].map(id => {
          if (!id) return null
          const {teamName} = teams.find(team => team.id === id)
          return (
            <TeamButton
              key={`button-${id}`} 
              teamName={teamName} 
              onClick={() => setInView(id)} 
              inView={inView === id} 
              gameTimeEnd={gameTimeEnd}
            />
          )
        })}
      </div>
      <Stats
        key={`stats-${awayId}`}
        inView={inView === awayId}
        path={`gameEvents/${gameId}/${awayId}`}
        setTeam={setAwayTeam}
        team={awayTeam}
      />
      <Stats
        key={`stats-${homeId}`}
        inView={inView === homeId}
        path={`gameEvents/${gameId}/${homeId}`}
        setTeam={setHomeTeam}
        team={homeTeam}
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