// import { getData } from "../data";
import Stats from "./Stats";

import styles from '../../styles/Game.module.css'
import Link from "next/link";
import { getData } from "../data";

// const {API_BASE} = process.env 

// async function getGameEvents(path) {
//   const url = `${API_BASE}/gameEvents/${path}`
//   const events = await fetch(url);
//   // const events = await getData(`gameEvents/${path}`)
//   // const score = events.reduce((goals, { eventType }) => {
//   //   if (eventType === "Goal") goals += 1
//   //   return goals
//   // }, 0);
//   // return {
//   //   score,
//   //   events
//   // }
//   return events.json()
// }

// maybe req should return events.pop()
// 2 state variables 
// check single event
// add event to state
// will need stats table and <PlayerRow />

export default async function GamePage({ params, searchParams }) {
  const [gameId, awayId, homeId] = params.game.split("-");
  // const awayTeamData = await getGameEvents(`${gameId}/${awayId}`)
  // const homeTeamData = await getGameEvents(`${gameId}/${homeId}`)
  // const awayEvents = await getGameEvents(`${gameId}/${awayId}`)
  // const homeEvents = await getGameEvents(`${gameId}/${homeId}`)
  const awayEvents = await getData(`gameEvents/${gameId}/${awayId}`)
  const homeEvents = await getData(`gameEvents/${gameId}/${homeId}`)
  const eventData = {
    awayId,
    homeId,
    // awayEvents: awayTeamData.events,
    // homeEvents: homeTeamData.events,
    awayEvents,
    homeEvents,
  }
  return (
    <main className={styles.game}>
      <Link className={styles.navBack} href='/'>&#x2715;</Link>
      {/* <div className={styles.score}>{`${awayTeamData.score} - ${homeTeamData.score}`}</div> */}
      <Stats eventData={eventData} />
    </main>
  )
}