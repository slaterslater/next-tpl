// Stats.js

'use client'

import { useEffect, useState } from "react"
import useSWR from "swr"
import { processGameEvents, countGoals, getEvents } from "../utils/lib"

export default function Stats({gameId, teamId, inView, events, setScore}) { 

  const [gameData, setGameData] = useState(() => 
    processGameEvents({ players: [], lastSequence: 0}, events)
  )
  
  const fetchProps = {
    gameId, 
    teamId, 
    lastSequence: gameData.lastSequence
  }

  const { data : newData } = useSWR(fetchProps, getEvents)

  useEffect(() => {
    if (!newData) return
    const { events } = newData
    const updatedGameData = processGameEvents(gameData, events)
    const goals = countGoals(events)
    setScore(prev => prev + goals)
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
          <td>{stats["Goal"]}</td>
          <td>{stats["Assist"]}</td>
          <td>{stats["2nd Assist"]}</td>
          <td>{stats["D"]}</td>
          <td>{stats["TA"]}</td>
          <td>{stats["Drop"]}</td>
          <td>{stats["Male"]}</td>
          <td>{stats["Female"]}</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}
