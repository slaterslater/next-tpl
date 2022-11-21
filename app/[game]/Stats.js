// Stats.js

import { useEffect, useState } from "react"
import useSWR from "swr"
import { processGameEvents, statNames } from "../utils/lib"

const getData = async path => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/gameEvents/${path}`
  const res = await fetch(url)
  return res.json()
}

export default function Stats({ inView, path, team, setTeam}) { 
  
  const { data } = useSWR(path, getData)

  useEffect(() => {
    const { sequence } = team.lastEvent
    if (!data || sequence === data.length) return
    const newData = data.slice(sequence)
    const updatedGameData = processGameEvents(team, newData)
    // setTeam({
    //   ...team,
    //   ...updatedGameData
    // })
    setTeam({...updatedGameData})
  }, [data, team, setTeam])

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
        {team.players.map(({id, playerName, stats}) => (
          <tr key={id}>
            <td>{playerName}</td>
            {statNames.map(name => 
              <td key={`player-${name}`}>{stats[name]}</td>
            )}
          </tr>
        ))}
        <tr className="total">
          <td></td>
          {statNames.map(name => 
            <td key={`total-${name}`}>{team.total[name]}</td>
          )}
        </tr>
      </tbody>
    </table>
  )
}
