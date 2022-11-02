// page.js
// Homepage

import Schedule from "./Schedule";

const {API_BASE, LEAGUE_ID} = process.env

async function getLeagueGames() {
  const url = `${API_BASE}/games/${LEAGUE_ID}`
  const leagueGames = await fetch(url);
  return leagueGames.json();
}

export default async function Page() {
  const leagueGames = await getLeagueGames()
  return <Schedule season={leagueGames} />;
}
