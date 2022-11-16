// Stats.js

'use client'

import { useEffect, useState } from "react"
import useSWR from "swr"
import { statNames, processGameEvents, getEvents } from "../utils/lib"

export default function Stats({gameId, teamId, inView, data, setScore}) { 

  const [gameData, setGameData] = useState(data)

  const args = {
    gameId, 
    teamId, 
    lastSequence: gameData.lastEvent.sequence
  }

  const { data : newData } = useSWR(args, getEvents)

  useEffect(() => {
    if (!newData) return
    const { events } = newData
    const updatedGameData = processGameEvents(gameData, events)
    setScore(updatedGameData.total.Goal)
    setGameData(updatedGameData)
  }, [gameData, newData, setScore])

  if (!inView) return null
  return (
    <table className="stats">
      <thead>
        <tr>
          <th></th>
          <th>G</th>
          <th>A</th>
          <th>2A</th>
          <th>D</th>
          <th>TA</th>
          <th>RE</th>
          <th>pM</th>
          <th>pF</th>
        </tr>
      </thead>
      <tbody>
      {gameData.players.map(({id, playerName, stats}) => (
        <tr key={id}>
          <td>{playerName}</td>
          {statNames.map(name => 
            <td key={`player-${name}`}>{stats[name]}</td>
          )}
        </tr>
      ))}
      </tbody>
    </table>
  )
}
