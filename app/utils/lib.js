// lib.js
// helper functions

export const statNames = ["Goal","Assist","2nd Assist","D","TA","Drop","Male","Female"];
export const blankStats = Object.fromEntries(statNames.map(name => [name, 0]))

export const processGameEvents = (staleData, newEvents) => (
  newEvents.reduce((gameData, event) => {
    
    const {total, players, lastEvent} = gameData
    
    const { 
      eventType, 
      player : {id, playerName, gender} 
    } = event

    const initPlayer = {
      id, 
      playerName, 
      gender, 
      stats: {...blankStats}, 
    }
    
    let playerIndex = players.findIndex(p => 
      p?.playerName === playerName
    )
    playerIndex = playerIndex < 0 ? players.length : playerIndex 
    
    const player = players[playerIndex] || initPlayer
    const isPass = ![undefined, 'Goal','D','TA','Drop'].includes(lastEvent.eventType)

    // if event not a D check if last event was a pass
    if (!['D'].includes(eventType) && isPass){
      const passerIndex = players.findIndex(passer => 
        passer.playerName === lastEvent.player.playerName
      )
      players[passerIndex].stats[gender] += 1
      total[gender] += 1
    }

    // update player
    if (eventType) {
      player.stats[eventType] += 1
      total[eventType] += 1
    }
    players[playerIndex] = player
    gameData.lastEvent = event

    return gameData

  }, staleData)
)

// export const getEvents = async ({gameId, teamId, lastSequence}) => {
//   const data = await fetch('/api/events', {
//     method: 'POST',
//     body: JSON.stringify({gameId, teamId, lastSequence}),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//   return data.json()
// }
