// Schedule.js

'use client'

import { useGameContext } from "../context/gameContext";
import GameLink from "./GameLink";
import Spinner from "./Spinner";

export default function Schedule() {
  const { weeks } = useGameContext()
  const {length} = weeks

  if (!length) return <Spinner />

  return weeks.map((week, i) => (
    <div className="week" key={week.date}>
      <p>{`Week ${weeks.length - i}:`} <span>{`${week.date.split(",")[0]}`}</span></p>
      {week.games.map((game, j) => <GameLink key={game.id} game={game} weekNum={length - i} gameNum={j+1} />)}
    </div>
  ));
}
