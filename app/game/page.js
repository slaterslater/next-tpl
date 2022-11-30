// [game]/page.js

'use client'

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useTeamContext } from "../context/teamContext"
import { initTeam } from "../utils/lib"
import Stats from "./Stats"

export default function GamePage({ searchParams }) {

  const { gameId, awayId, homeId, gameTimeEnd } = searchParams
  const { teams } = useTeamContext()
  const [inView, setInView] = useState(awayId)
  const [awayTeam, setAwayTeam] = useState(() => initTeam())
  const [homeTeam, setHomeTeam] = useState(() => initTeam())

  const score = useMemo(() => (
    `${awayTeam.total.Goal} - ${homeTeam.total.Goal}`
  ), [awayTeam, homeTeam])

  useEffect(()=> {
    window.history.replaceState(null, '', '/')
  }, [])

  return (
    <main>
      <div className="score" key={score}>{score}</div>
      <div className="teams">
        {[awayId, homeId].map(id => {
          if (!id) return null
          const {teamName} = teams.find(team => team.id === id)
          return (
            <TeamButton
              key={id} 
              teamName={teamName} 
              onClick={() => setInView(id)} 
              inView={inView === id} 
              gameTimeEnd={gameTimeEnd}
            />
          )
        })}
      </div>
      <Stats
        inView={inView === awayId}
        path={`gameEvents/${gameId}/${awayId}`}
        setTeam={setAwayTeam}
        team={awayTeam}
      />
      <Stats
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