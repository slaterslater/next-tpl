// Schedule.js

'use client'

import { useLeagueContext } from "../context/leagueContext";
import GameLink from "./GameLink";
import Spinner from "./Spinner";

export default function Schedule({data}) {
  
  const { weeks } = useLeagueContext()
  const { length } = weeks

  if (!length) return <Spinner />

  return weeks.map((week, i) => (
    <div className="week" key={week.date}>
      <p>{`Week ${weeks.length - i}:`} <span>{`${week.date.split(",")[0]}`}</span></p>
      {week.games.map((game, j) => <GameLink key={game.id} game={game} weekNum={length - i} gameNum={j+1} />)}
    </div>
  ));
}
