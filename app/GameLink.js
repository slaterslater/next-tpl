import dayjs from "dayjs";
import Link from "next/link";

export default function GameLink({game}) {
    const [hh, mm] = game.time.split("-")[0].split(":");
    const gameTimeEnd = dayjs(game.date).hour(hh).add(1, 'hour').unix()
    
    const href={
      pathname: '/game',
      query: { 
        gameId: game.id, 
        awayId: game.awayTeamId, 
        homeId: game.homeTeamId,
        gameTimeEnd
      },
    }
    
    return (
      <Link className="game" href={href} replace>
        <div className="field">
          <span>{`${hh % 12}:${mm}`}</span>
          <span>{game.location}</span>
        </div>
        <span>{game.awayTeam}</span>
        <span>{game.homeTeam}</span>
      </Link>
    );
  }