// page.js
// Homepage

import Schedule from "./Schedule";
import { getData } from "./utils/lib";

export default async function Page() {
  
  const games = await getData(`games/${process.env.LEAGUE_ID}`)

  return <Schedule games={games} />;
}