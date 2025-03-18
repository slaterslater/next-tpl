import { LeagueProvider } from "./context/leagueContext";
import { getData } from './utils/lib';

export default async function Template({ children }) {
  const ID = process.env.NEXT_PUBLIC_LEAGUE_ID
  const revalidate = { next: { revalidate: 14400 }} // every 4 hours

  const teams = await getData(`teams/${ID}`, revalidate)
  const games = await getData(`games/${ID}`, revalidate)
  
  return <LeagueProvider teams={teams} games={games}>{children}</LeagueProvider>
}