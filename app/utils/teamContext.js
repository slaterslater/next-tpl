'use client';

import { createContext, useContext } from "react";

export const TeamContext = createContext(null);
const useTeamContext = () => useContext(TeamContext)

const TeamProvider = ({value, children}) => (
  <TeamContext.Provider value={value}>
    {children}
  </TeamContext.Provider>
)

export {TeamProvider, useTeamContext}