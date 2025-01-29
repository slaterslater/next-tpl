// game/[gameId]/page.js

"use client";

import { useParams } from "next/navigation";
import Link from "next/link"
import { useMemo, useState } from "react"
import { useGameContext } from "../../../../context/gameContext";
import Spinner from "../../../../components/Spinner"
import Stats from "../Stats"
import { initTeam } from "../../../../utils/lib";
import dayjs from "dayjs";

export default function GamePage() {

  const {teams, weeks} = useGameContext()
  const params = useParams();

  const {gameId, awayId, homeId, gameTimeEnd} = useMemo(() => {
    const {length} = weeks
    const {weekNum, gameNum} = params

    const week = weeks[weekNum - length]
    const game = week?.games[gameNum - 1]
    
    const hh = game.time.slice(0,2)
    const gameTimeEnd = dayjs(week.date).hour(hh).add(1, 'hour').unix()

    return {gameId: game.id, awayId: game.awayTeamId, homeId: game.homeTeamId, gameTimeEnd}
  }, [weeks, params])

  const [inView, setInView] = useState(awayId)
  const [awayTeam, setAwayTeam] = useState(() => initTeam())
  const [homeTeam, setHomeTeam] = useState(() => initTeam())

  const score = `${awayTeam.total.Goal} - ${homeTeam.total.Goal}`

  if (!(teams && awayId && gameId)) return <Spinner />
  return (
    <main>
      <div className="score" key={score}>{score}</div>
      <div className="teams">
        {[awayId, homeId].map(id => {
          const { teamName } = teams.find(team => team.id === id)
          return (
            <TeamButton
              key={`button-${id}`} 
              teamName={teamName} 
              onClick={() => setInView(id)} 
              inView={inView === id} 
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
        gameTimeEnd={gameTimeEnd}
      />
      <Stats
        key={`stats-${homeId}`}
        inView={inView === homeId}
        path={`gameEvents/${gameId}/${homeId}`}
        setTeam={setHomeTeam}
        team={homeTeam}
        gameTimeEnd={gameTimeEnd}
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