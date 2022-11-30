'use client';

import dayjs from "dayjs";
import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { getData } from "../utils/lib";

export const GameContext = createContext(null);
const useGameContext = () => useContext(GameContext)

const GameProvider = ({ children }) => {
  const defaultValues = {
    gameId: null,
    awayId: null,
    homeId: null,
    gameTimeEnd: 0
  }
  const [game, setGame] = useState(defaultValues)
  const [teams, setTeams] = useState([])
  const [weeks, setWeeks] = useState([])

  const teamPath = `teams/${process.env.NEXT_PUBLIC_LEAGUE_ID}`
  const gamePath = `games/${process.env.NEXT_PUBLIC_LEAGUE_ID}`

  const { data: teamData } = useSWR(teamPath, getData)
  const { data: gameData } = useSWR(gamePath, getData)

  useEffect(() => {
    if (!teamData) return
    setTeams(teamData)
  }, [teamData])

  useEffect(() => {
    if (!gameData) return
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

    setWeeks(schedule)
  }, [gameData])

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