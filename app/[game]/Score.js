'use client'

import { useMemo } from "react"
import { useTeamContext } from "../utils/teamContext"

export default function Score({scoreData}) {
  const {teams} = useTeamContext()
  const {awayId, homeId, awayScore, homeScore} = scoreData
  const [awayTeamName, homeTeamName] = useMemo(() => (
    [awayId, homeId].map(teamId => teams.find(({id}) => id === teamId).teamName)
  ), [teams, awayId, homeId])

  // console.log({awayTeamName})
  return <p>{`${awayTeamName} ${awayScore} - ${homeScore} ${homeTeamName}`}</p>
}