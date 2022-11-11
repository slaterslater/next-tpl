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

// install plugin mentioneed in netlify blog

export default async function Page() {
  const { games } = await getGames()
  return <Schedule games={games} />;
}