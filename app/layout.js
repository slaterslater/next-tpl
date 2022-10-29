import { TeamProvider } from "./utils/teamContext";
import { getData } from "./utils/data";

export default async function RootLayout({ children }) {
  const {LEAGUE_ID} = process.env
  const teams = await getData(`teams/${LEAGUE_ID}`)

  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        <h1>...</h1>
        <TeamProvider value={{teams}}>
          {children}
        </TeamProvider>
      </body>
    </html>
  );
}