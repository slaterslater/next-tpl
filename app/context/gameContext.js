'use client';

import dayjs from "dayjs";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getData } from "../utils/lib";

export const GameContext = createContext(null);
const useGameContext = () => useContext(GameContext)

const GameProvider = ({value, children}) => {
  const defaultValues = {
    gameId: null,
    awayId: null,
    homeId: null,
    gameTimeEnd: 0
  }
  const [game, setGame] = useState(defaultValues)
  const [teams, setTeams] = useState([])
  const [weeks, setWeeks] = useState([])

  useEffect(() => {
    (async () => {
      const teamData = await getData(`teams/${process.env.NEXT_PUBLIC_LEAGUE_ID}`)
      const gameData = await getData(`games/${process.env.NEXT_PUBLIC_LEAGUE_ID}`)

      const schedule = gameData.reduce((weeks, game) => {
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
  
      schedule.sort((a, b) => 
        dayjs(b.date).unix() - dayjs(a.date).unix()
      );

      setTeams(teamData)
      setWeeks(schedule)
    })()
  }, [])

  const setActiveGame = activeGame => {
    const { id, awayTeamId, homeTeamId, date, time } = activeGame
    const hh = time.slice(0,2)
    const gameTimeEnd = dayjs(date).hour(hh).add(1, 'hour').unix()
    
    setGame({ 
      gameId: id, 
      awayId: awayTeamId, 
      homeId: homeTeamId,
      gameTimeEnd
    })
  } 
  
  return (
    <GameContext.Provider value={{teams, weeks, game, setActiveGame}}>
      {children}
    </GameContext.Provider>
  )
}

export {GameProvider, useGameContext}