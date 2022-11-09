// [game]/page.js

import { db } from "../utils/server";
import GameView from "./GameView";

const getGameEvents = async ({gameId, awayId, homeId}) => ({
  awayEvents : await db.event.findMany({
    where: {
      gameId: gameId,
      teamId: awayId
    },
  }),
  homeEvents : await db.event.findMany({
    where: {
      gameId: gameId,
      teamId: homeId
    },
  })
}) 

export default async function GamePage({ params, searchParams }) {
  const [gameId, awayId, homeId] = params.game.split("-");
  const ids = {gameId, awayId, homeId}
  const {awayEvents, homeEvents} = await getGameEvents(ids)

  return (
    <GameView
      ids={ids}
      awayEvents={awayEvents}
      homeEvents={homeEvents}
    />
  )
}