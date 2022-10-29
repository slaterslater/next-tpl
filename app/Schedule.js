import { useMemo } from "react";
import Link from 'next/link';

export default function Schedule({season}) {
  const schedule = useMemo(() => {
    const weeks = season.reduce((weeks, game) => {
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
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  }, [season]);

  // console.log({ schedule });

  return schedule.map((week, i) => (
    <div key={week.date}>
      <div>{`Week ${schedule.length - i}: ${week.date.split(",")[0]}`}</div>
      {week.games.map((game) => {
        const [hh, mm] = game.time.split("-")[0].split(":");
        const href = `/${game.id}-${game.awayTeamId}-${game.homeTeamId}`;
        return (
          <Link href={href} key={game.id}>
            <span>{game.awayTeam}</span>
            <div>
              <span>{`${hh % 12}:${mm}`}</span>
              <span>{game.location}</span>
            </div>
            <span>{game.homeTeam}</span>
          </Link>
        );
      })}
    </div>
  ));
}
