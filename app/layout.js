// layout.js
// Root layout

import { TeamProvider } from "./context/teamContext";
import { db } from './utils/server'
import './global.css';

const getTeams = async () => ({
    teams: await db.team.findMany({
      where: {
        leagueId: process.env.LEAGUE_ID,
      },
    })
  })

export default async function RootLayout({ children }) {
  const {teams} = await getTeams()

  return (
    <html lang="en">
      <head>
        <title>TPL scores</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      <body>
        <TeamProvider value={{teams}}>
          {children}
        </TeamProvider>
      </body>
    </html>
  );
}