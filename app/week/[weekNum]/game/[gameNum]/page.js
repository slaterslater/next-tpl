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
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween);

export default function GamePage() {

  const {teams, weeks} = useGameContext()
  const params = useParams();

  const {gameId, awayId, homeId, shouldRefresh} = useMemo(() => {
    const {length} = weeks
    const {weekNum, gameNum} = params

    const week = weeks[length - weekNum]
    const game = week?.games[gameNum - 1]

    const now = dayjs()
    const gameDay = dayjs(game.date)
    const isGameDay = now.isSame(gameDay, 'day')

    let shouldRefresh = false

    if (isGameDay){
      const hh = game.time.slice(0,2) // start hour
      const gameStart = gameDay.hour(hh)
      const gameEnd = gameStart.add(1, 'hour')
      shouldRefresh = now.isBetween(gameStart, gameEnd, 'hour', '[)') 
      // https://day.js.org/docs/en/plugin/is-between
    }

    return {
      gameId: game.id, 
      awayId: game.awayTeamId, 
      homeId: game.homeTeamId, 
      shouldRefresh
    }
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
        shouldRefresh={shouldRefresh}
      />
      <Stats
        key={`stats-${homeId}`}
        inView={inView === homeId}
        path={`gameEvents/${gameId}/${homeId}`}
        setTeam={setHomeTeam}
        team={homeTeam}
        shouldRefresh={shouldRefresh}
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