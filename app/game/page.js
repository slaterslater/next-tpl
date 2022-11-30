// [game]/page.js

'use client'

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useTeamContext } from "../context/teamContext"
import { initTeam } from "../utils/lib"
import Stats from "./Stats"

export default function GamePage({ searchParams }) {

  const { gameId, awayId, homeId, gameTimeEnd } = searchParams
console.log({ gameId, awayId, homeId, gameTimeEnd, searchParams })

  const { teams } = useTeamContext()
  const [inView, setInView] = useState(awayId)
  const [awayTeam, setAwayTeam] = useState(() => initTeam())
  const [homeTeam, setHomeTeam] = useState(() => initTeam())

  const score = useMemo(() => (
    `${awayTeam.total.Goal} - ${homeTeam.total.Goal}`
  ), [awayTeam, homeTeam])

  // const teamStats = useMemo(() => [
  //   {
  //     teamId: awayId,
  //     setTeam: setAwayTeam,
  //     team: awayTeam
  //   },
  //   {
  //     teamId: homeId,
  //     setTeam: setHomeTeam,
  //     team: homeTeam
  //   },
  // ], [])

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
              key={`button-${id}`} 
              teamName={teamName} 
              onClick={() => setInView(id)} 
              inView={inView === id} 
              gameTimeEnd={gameTimeEnd}
            />
          )
        })}
      </div>
      {/* {.map(({teamId, team, setTeam}) => (
        <Stats
          key={`stats-${teamId}`}
          inView={inView === teamId}
          path={`gameEvents/${gameId}/${teamId}`}
          setTeam={setTeam}
          team={team}
        />
      ))} */}
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