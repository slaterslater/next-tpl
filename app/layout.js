// layout.js
// Root layout

import '../styles/global.css';
import { TeamProvider } from "./teamContext";
import { getData } from "./data";

export default async function RootLayout({ children }) {
  const {LEAGUE_ID} = process.env
  const teams = await getData(`teams/${LEAGUE_ID}`)

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