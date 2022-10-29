import Score from "./Score";

async function getGameEvents(path) {
  const url = `${process.env.API_BASE}/gameEvents/${path}`
  const res = await fetch(url, { next: { revalidate: 10 } });
  const events = await res.json()
  const score = events.reduce((goals, { eventType }) => {
    if (eventType === "Goal") goals += 1
    return goals
  }, 0);
  return {
    score,
    events
  }
}

export default async function GamePage({ params, searchParams }) {
// export default async function GamePage(props) {
  const [gameId, awayId, homeId] = params.game.split("-");
  const awayTeamData = await getGameEvents(`${gameId}/${awayId}`)
  const homeTeamData = await getGameEvents(`${gameId}/${homeId}`)
  // console.log({awayTeamData, homeTeamData})
  // return <Score awayId={awayId} awayScore={awayTeamData.score}  homeScore={homeTeamData.score} />
  return <Score scoreData={{
    awayId,
    homeId,
    awayScore: awayTeamData.score,
    homeScore: homeTeamData.score
  }} />
}