// layout.js
// Root layout

import { GameProvider } from "./context/teamContext";
import { getData } from "./utils/lib";
import './global.css';

export default async function RootLayout({ children }) {
  
  const teams = await getData(`teams/${process.env.LEAGUE_ID}`)

  return (
    <html lang="en">
      <head>
        <title>TPL scores</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      <body>
        <GameProvider value={{teams}}>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}