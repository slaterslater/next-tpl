// evnets.js
// prisma does not work on the client
// client component can fetch this api route

import { db } from "../../app/utils/server"

export default async function handler(req, res) {
  const {gameId, teamId, lastSequence} = req.body
  const events = await db.event.findMany({
      where: {
        gameId,
        teamId,
        sequence: {
          gt: lastSequence
        }
      },
    })
  res.status(200).json({ events })
}