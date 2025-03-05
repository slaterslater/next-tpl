'use client';

import dayjs from "dayjs";
import { createContext, useContext, useMemo } from "react";

export const LeagueContext = createContext(null);
const useLeagueContext = () => useContext(LeagueContext)

const LeagueProvider = ({teams, games, children}) => {

  const weeks = useMemo(() => {
    if (!games) return []

    const schedule = games.reduce((weeks, game) => {
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

    schedule.forEach(({ games }) =>
      games.sort((a, b) => {
        const timeDiff = a.time.localeCompare(b.time);
        if (timeDiff !== 0) return timeDiff;
        return a.location.localeCompare(b.location);
      })
    );

    return schedule.sort((a, b) => 
      dayjs(b.date).unix() - dayjs(a.date).unix()
    );
  }, [games])

  return (
    <LeagueContext.Provider value={{teams, games, weeks}}>
      {children}
    </LeagueContext.Provider>
  )
}

export {LeagueProvider, useLeagueContext}