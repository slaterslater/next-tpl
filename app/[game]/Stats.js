// Stats.js

import { useEffect, useState } from "react"
import useSWR from "swr"
import { blankStats, processGameEvents, statNames } from "../utils/lib"

const getData = async path => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/gameEvents/${path}`
  const res = await fetch(url)
  return res.json()
}

export default function Stats({ inView, path, setScore}) { 
  
  const initValues = {
      total: {...blankStats},
      players: [],
      lastEvent: { sequence: 0 }
  }
  
  const [gameData, setGameData] = useState(initValues)
  const { data } = useSWR(path, getData)

  useEffect(() => {
    if (!data) return
    const { sequence } = gameData.lastEvent
    const newData = data.slice(sequence)
    const updatedGameData = processGameEvents(gameData, newData)
    setGameData(updatedGameData)
    setScore(updatedGameData.total.Goal)
  }, [data, gameData, setScore])

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
        <tr>
          <td>total</td>
          {statNames.map(name => 
            <td key={`total-${name}`}>{gameData.total[name]}</td>
          )}
        </tr>
      </tbody>
    </table>
  )
}
