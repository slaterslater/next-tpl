// Schedule.js

'use client'

import { useGameContext } from "./context/gameContext";
import GameLink from "./GameLink";
import Spinner from "./Spinner";

export default function Schedule() {
  const { weeks } = useGameContext()

  if (!weeks.length) return <Spinner />
  
  return weeks.map((week, i) => (
    <div className="week" key={week.date}>
      <p>{`Week ${weeks.length - i}:`} <span>{`${week.date.split(",")[0]}`}</span></p>
      {week.games.map((game) => <GameLink key={game.id} game={game} />)}
    </div>
  ));
}
