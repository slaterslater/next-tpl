// [game]/page.js

import GameView from "./GameView";

// const getGameEvents = async ({gameId, awayId, homeId}) => ({
//   awayEvents : await db.event.findMany({
//     where: {
//       gameId: gameId,
//       teamId: awayId,
//     },
//   }),
//   homeEvents : await db.event.findMany({
//     where: {
//       gameId: gameId,
//       teamId: homeId
//     },
//   })
// }) 

export default async function GamePage({ params }) {
  const [gameId, awayId, homeId] = params.game.split("-");
  return <GameView ids={{gameId, awayId, homeId}} />
}