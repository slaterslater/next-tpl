// Stats.js

import { useEffect } from "react"
import useSWR from "swr"
import { getData, processTeamData, statNames } from "../../../utils/lib"
import Spinner from "../../../components/Spinner"

export default function Stats({ inView, path, team, setTeam, shouldRefresh}) { 
  
  const refreshInterval = shouldRefresh ? 5000 : null

  const { data, error, isLoading } = useSWR(path, getData, { refreshInterval })

  useEffect(() => {
    const { sequence } = team.lastEvent

    if (!data?.length || data[data.length -1].sequence === sequence) return

    const newData = data
      .slice(sequence)
      .sort((a, b) => a.sequence - b.sequence)

    const updatedTeamData = processTeamData(team, newData)
    setTeam({...updatedTeamData})

  }, [data])

  if (!inView) return null
  if (isLoading || error) return <Spinner />
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
          <tr key={id} className={stats.callahan ? 'callahan' : null}>
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
