// lib.js
// helper functions

export const processGameEvents = (gameData, newEvents) => (
  newEvents.reduce(({players, lastSequence}, e, i, a) => {
    const stats = {
      "Goal": 0,
      "Assist": 0,
      "2nd Assist": 0,
      "D": 0,
      "TA": 0,
      "Drop": 0,
      "Male": 0,
      "Female": 0,
    }
    const lastEvent = {
      sequence: null,
      eventType: null
    }
    const { 
      eventType, 
      sequence, 
      player : {id, playerName, gender} 
    } = e
    const initPlayer = {
      id, 
      playerName, 
      gender, 
      stats, 
      lastEvent
    }
    
    let playerIndex = players.findIndex(p => 
      p?.playerName === playerName
    )
    playerIndex = playerIndex < 0 ? players.length : playerIndex 
    
    const player = players[playerIndex] || initPlayer

    // if event not a D check if last event was a throw
    if (!['D'].includes(eventType)){
      const passerIndex = players.findIndex(p =>
        p.lastEvent.sequence === sequence - 1 && 
        !['Goal','D','TA','Drop'].includes(p.lastEvent.eventType)
      )
      //  if throw, update throwers gender stat
      if (passerIndex !== -1){
        players[passerIndex].stats[gender] += 1
      }
    }

    // update player
    if (eventType) {
      player.stats[eventType] += 1
    }
    player.lastEvent = {sequence, eventType}
    players[playerIndex] = player
    
    return { 
      players, 
      lastSequence: sequence 
    }
  }, gameData)
)

export const getEvents = async ({gameId, teamId, lastSequence}) => {
  const data = await fetch('/api/events', {
    method: 'POST',
    body: JSON.stringify({gameId, teamId, lastSequence}),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return data.json()
}

export const countGoals = events => {
  if (!events.length) return 0
  return events.filter(({eventType}) => eventType === 'Goal').length 
}