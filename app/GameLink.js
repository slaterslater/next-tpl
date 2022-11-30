'use client'

import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Router } from "next/router";

export default function GameLink({game}) {
    const [hh, mm] = game.time.split("-")[0].split(":");
    const gameTimeEnd = dayjs(game.date).hour(hh).add(1, 'hour').unix()
    const router = useRouter()
    
    const href={
      pathname: '/game',
      query: { 
        gameId: game.id, 
        awayId: game.awayTeamId, 
        homeId: game.homeTeamId,
        gameTimeEnd
      },
    }

    // const handleclick = () => {
    //   router.push('/game')
    //   // router.push(href, '/game')
    // }
    
    return (
      <Link className="game" href={href} replace>
      {/* <div className="game" onClick={handleclick}> */}
        <div className="field">
          <span>{`${hh % 12}:${mm}`}</span>
          <span>{game.location}</span>
        </div>
        <span>{game.awayTeam}</span>
        <span>{game.homeTeam}</span>
       </Link>
      // </div>
    );
  }