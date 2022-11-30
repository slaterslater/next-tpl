'use client'

import { useRouter } from 'next/navigation';
import { useGameContext } from "./context/gameContext";

export default function GameLink({game}) {
    
  const router = useRouter()
  const { setActiveGame } = useGameContext()

    const handleclick = () => {
      setActiveGame(game)
      router.push('/game')
    }

    const [hh, mm] = game.time.split("-")[0].split(":");
    
    return (
      <a className="game" onClick={handleclick}>
        <div className="field">
          <span>{`${hh % 12}:${mm}`}</span>
          <span>{game.location}</span>
        </div>
        <span>{game.awayTeam}</span>
        <span>{game.homeTeam}</span>
      </a>
    );
  }