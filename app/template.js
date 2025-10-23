import { LeagueProvider } from "./context/leagueContext";
import { getData } from './utils/lib';

export const revalidate = 14400;
export const dynamic = 'force-static';

export default async function Template({ children }) {
  const ID = process.env.NEXT_PUBLIC_LEAGUE_ID

  const teams = await getData(`teams/${ID}`) ?? []
  const games = await getData(`games/${ID}`) ?? []

  return <LeagueProvider teams={teams} games={games}>{children}</LeagueProvider>
}