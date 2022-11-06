'use client'

export default function Stats() { 
const teamStats = [];
return teamStats.map(({id, playerName, stats}) => (
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
))
}