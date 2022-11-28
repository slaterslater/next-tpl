// Schedule.js

import dayjs from "dayjs";
import { useMemo } from "react";
import GameLink from "./GameLink";

export default function Schedule({games}) {

  const schedule = useMemo(() => {
    const weeks = games.reduce((weeks, game) => {
      const { date } = game;
      const day = weeks.find((week) => week.date === date);
      if (!day) {
        weeks.push({
          date,
          games: [game],
        });
      } else {
        day.games.push(game);
      }
      return weeks;
    }, []);

    weeks.forEach(({ games }) =>
      games.sort((a, b) => {
        const timeDiff = a.time.localeCompare(b.time);
        if (timeDiff !== 0) return timeDiff;
        return a.location.localeCompare(b.location);
      })
    );

    return weeks.sort((a, b) => 
      dayjs(b.date).unix() - dayjs(a.date).unix()
    );

  }, [games]);

  return schedule.map((week, i) => (
    <div className="week" key={week.date}>
      <p>{`Week ${schedule.length - i}:`} <span>{`${week.date.split(",")[0]}`}</span></p>
      {week.games.map((game) => <GameLink key={game.id} game={game} />)}
    </div>
  ));
}
