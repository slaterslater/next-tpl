// Schedule.js
'use client'

import { useMemo } from "react";
import Link from 'next/link';
import styles from '../styles/Schedule.module.css'

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
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  }, [games]);

  return schedule.map((week, i) => (
    <div className={styles.week} key={week.date}>
      <p>{`Week ${schedule.length - i}: ${week.date.split(",")[0]}`}</p>
      {week.games.map((game) => {
        const [hh, mm] = game.time.split("-")[0].split(":");
        const href = `/${game.gameId}-${game.awayTeamId}-${game.homeTeamId}`;
        
        return (
          <Link className={styles.game} href={href} key={game.id}>
            <div className={styles.field}>
              <span>{`${hh % 12}:${mm}`}</span>
              <span>{game.location}</span>
            </div>
            <span>{game.awayTeam}</span>
            <span>{game.homeTeam}</span>
          </Link>
        );
      })}
    </div>
  ));
}
