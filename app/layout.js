// layout.js
// Root layout

import { TeamProvider } from "./context/teamContext";
import { db } from './utils/server'
import '../styles/global.css';

const getTeams = async () => ({
    teams: await db.team.findMany({
      where: {
        leagueId: process.env.LEAGUE_ID,
      },
    })
  })

export default async function RootLayout({ children }) {
  const { teams } = await getTeams()

  return (
    <html lang="en">
      <head>
        <title>TPL scores</title>
      </head>
      <body>
        <TeamProvider value={{teams}}>
          {children}
        </TeamProvider>
      </body>
    </html>
  );
}