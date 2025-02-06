import Link from 'next/link';

export default function GameLink({game, weekNum, gameNum}) {
    
    const [hh, mm] = game.time.split("-")[0].split(":");
    
    return (
      <Link className="game" href={`/week/${weekNum}/game/${gameNum}`} prefetch={true}>
        <div className="field">
          <span>{`${hh % 12}:${mm}`}</span>
          <span>{game.location}</span>
        </div>
        <span>{game.awayTeam}</span>
        <span>{game.homeTeam}</span>
      </Link>
    );
  }