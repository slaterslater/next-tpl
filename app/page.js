// page.js
// Homepage

import { getData } from "./data";
import Schedule from "./Schedule";

const {LEAGUE_ID} = process.env

export default async function Page() {
  const leagueGames = await getData(`games/${LEAGUE_ID}`)
  return <Schedule season={leagueGames} />;
}