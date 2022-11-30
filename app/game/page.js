// [game]/page.js

'use client'

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from 'next/navigation';
import { useTeamContext } from "../context/teamContext"
import { initTeam } from "../utils/lib"
import Stats from "./Stats"

export default function GamePage() {

  const searchParams = useSearchParams();

  const gameId = searchParams.get('gameId');
  const awayId = searchParams.get('awayId');
  const homeId = searchParams.get('homeId');
  const gameTimeEnd = searchParams.get('gameTimeEnd');

  const { teams } = useTeamContext()
  const [inView, setInView] = useState(awayId)
  const [awayTeam, setAwayTeam] = useState(() => initTeam())
  const [homeTeam, setHomeTeam] = useState(() => initTeam())

  const score = useMemo(() => (
    `${awayTeam.total.Goal} - ${homeTeam.total.Goal}`
  ), [awayTeam, homeTeam])

  useEffect(()=> {
    console.log('clear url params')
    if (window) console.log('...ok')
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