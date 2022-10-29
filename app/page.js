import Schedule from "./Schedule";

async function getLeagueGames() {
  const {API_BASE, LEAGUE_ID} = process.env
  const leagueGames = await fetch(`${API_BASE}/games/${LEAGUE_ID}`);
  return leagueGames.json();
}

export default async function Page() {
  const leagueGames = await getLeagueGames()
  return <Schedule season={leagueGames} />;
}
