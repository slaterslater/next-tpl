// layout.js
// Root layout

import { GameProvider } from "./context/gameContext";
import './global.css';
import { getData } from './utils/lib';
import { GoogleAnalytics } from '@next/third-parties/google'

export const revalidate = 86400 // daily

export default async function RootLayout({ children }) {
  const GAID = process.env.NEXT_PUBLIC_GAID
  const ID = process.env.NEXT_PUBLIC_LEAGUE_ID
  const teams = await getData(`teams/${ID}`)
  const games = await getData(`games/${ID}`)

  return (
    <html lang="en">
      <head>
        <title>TPL scores</title>
        <meta name="description" content="track live TPL scores"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      
      <body>
        <GameProvider teams={teams} games={games}>
          {children}
        </GameProvider>
      </body>
      <GoogleAnalytics gaId={GAID} />
    </html>
  );
}