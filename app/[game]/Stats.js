'use client'

import { useMemo, useState } from "react"
import { useTeamContext } from "../teamContext"

import styles from '../../styles/Game.module.css'

export default function Stats({eventData}) {
  console.log({eventData})
  const {awayId, homeId, awayEvents, homeEvents} = eventData
  const {teams} = useTeamContext()
  const [current, setCurrent] = useState(awayId)
  
  const [awayTeamName, homeTeamName] = useMemo(() => (
    [awayId, homeId].map(teamId => teams.find(({id}) => id === teamId).teamName)
  ), [teams, awayId, homeId])

  const awayTeamStats = []
  const homeTeamStats = []
  // const awayTeamStats = useMemo(() => getTeamStats(awayEvents), [awayEvents])
  // const homeTeamStats = useMemo(() => getTeamStats(homeEvents), [homeEvents])

  return (
    <>
      <div className={styles.teams}>
        <TeamButton 
          teamName={awayTeamName} 
          onClick={() => setCurrent(awayId)} 
          isActive={current === awayId} 
        />
        <TeamButton 
          teamName={homeTeamName} 
          onClick={() => setCurrent(homeId)} 
          isActive={current === homeId} 
        />
      </div>
      <table className={styles.stats}>
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
        {current === awayId && awayTeamStats.map(({id, playerName, stats}) => (
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
        {current === homeId && homeTeamStats.map(({id, playerName, stats}) => (
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
    </>
  )
}

function TeamButton({teamName, onClick, isActive}) {
  return (
    <div className={`${styles.button} ${isActive && styles.isActive}`} onClick={onClick}>{teamName}</div>
  )
}

function getTeamStats(events) {
  return events.reduce((players, e, i, a) => {
    const stats = {
      "Goal": 0,
      "Assist": 0,
      "2nd Assist": 0,
      "D": 0,
      "TA": 0,
      "Drop": 0,
      "Male": 0,
      "Female": 0,
    };
    const {eventType, player : {id, playerName}} = e
    let playerIndex = players.findIndex(p => p?.playerName === playerName)
    playerIndex = playerIndex < 0 ? players.length : playerIndex 
    const player = players[playerIndex] || {id, playerName, stats}
    const isPass = !['Goal','D','TA','Drop'].includes(eventType)
    if (eventType) {
      player.stats[eventType] += 1
    }
    if (isPass) {
      const genderPass = a[i+1]?.player.gender
      player.stats[genderPass] += 1
    }
    players[playerIndex] = player
    return players
  }, [])
}
