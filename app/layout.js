// layout.js
// Root layout

import { LeagueProvider } from "./context/leagueContext";
import './global.css';
import { getData } from './utils/lib';
import { GoogleAnalytics } from '@next/third-parties/google'

const GAID = process.env.NEXT_PUBLIC_GAID
const ID = process.env.NEXT_PUBLIC_LEAGUE_ID

export default async function RootLayout({ children }) {
  const revalidate = { next: { revalidate: 14400 }} // every 4 hours

  const teams = await getData(`teams/${ID}`, revalidate)
  const games = await getData(`games/${ID}`, revalidate)

  return (
    <html lang="en">
      <head>
        <title>TPL scores</title>
        <meta name="description" content="track live TPL scores"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      
      <body>
        <LeagueProvider teams={teams} games={games}>
          {children}
        </LeagueProvider>
      </body>
      <GoogleAnalytics gaId={GAID} />
    </html>
  );
}