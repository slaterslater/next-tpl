'use client';

import { createContext, useContext, useState } from "react";

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
  
  return (
    <GameContext.Provider value={{...value, game, setGame}}>
      {children}
    </GameContext.Provider>
  )
}

export {GameProvider, useGameContext}