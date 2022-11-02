import { getData } from "../data";
import Stats from "./Stats";

import styles from '../../styles/Game.module.css'
import Link from "next/link";

async function getGameEvents(path) {
  const events = await getData(`gameEvents/${path}`)
  const score = events.reduce((goals, { eventType }) => {
    if (eventType === "Goal") goals += 1
    return goals
  }, 0);
  return {
    score,
    events
  }
}

// maybe req should return events.pop()
// 2 state variables 
// check single event
// add event to state
// will need stats table and <PlayerRow />

export default async function GamePage({ params, searchParams }) {
  const [gameId, awayId, homeId] = params.game.split("-");
  const awayTeamData = await getGameEvents(`${gameId}/${awayId}`)
  const homeTeamData = await getGameEvents(`${gameId}/${homeId}`)
  const eventData = {
    awayId,
    homeId,
    awayEvents: awayTeamData.events,
    homeEvents: homeTeamData.events,
  }
  return (
    <main className={styles.game}>
      <Link className={styles.navBack} href='/'>&#x2715;</Link>
      <div className={styles.score}>{`${awayTeamData.score} - ${homeTeamData.score}`}</div>
      <Stats eventData={eventData} />
    </main>
  )
}