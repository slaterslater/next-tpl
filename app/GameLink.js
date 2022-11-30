'use client'

import dayjs from "dayjs";
import { useRouter } from 'next/navigation';
import { useGameContext } from "./context/teamContext";

export default function GameLink({game}) {
    const [hh, mm] = game.time.split("-")[0].split(":");
    const gameTimeEnd = dayjs(game.date).hour(hh).add(1, 'hour').unix()
    const router = useRouter()

    const { setGame } = useGameContext()

    const handleclick = () => {
      setGame({ 
        gameId: game.id, 
        awayId: game.awayTeamId, 
        homeId: game.homeTeamId,
        gameTimeEnd
      })
      router.push('/game')
    }
    
    return (
      <div className="game" onClick={handleclick}>
        <div className="field">
          <span>{`${hh % 12}:${mm}`}</span>
          <span>{game.location}</span>
        </div>
        <span>{game.awayTeam}</span>
        <span>{game.homeTeam}</span>
      </div>
    );
  }