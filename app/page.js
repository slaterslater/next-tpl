// page.js
// Homepage

import Schedule from "./Schedule";
import { db } from "./utils/server";

const getGames = async () => ({
  games: await db.game.findMany({
    where: {
      leagueId: process.env.LEAGUE_ID,
    },
  })
})

export default async function Page() {
  const { games } = await getGames()
  return <Schedule games={games} />;
}