import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DIRECTIONS,
  changeDirection,
  createGame,
  startGame,
  stepGame
} from '../../games/snakeEngine';
import './snakeGame.css';

const KEY_DIRECTIONS = {
  ArrowUp: DIRECTIONS.up,
  w: DIRECTIONS.up,
  W: DIRECTIONS.up,
  ArrowDown: DIRECTIONS.down,
  s: DIRECTIONS.down,
  S: DIRECTIONS.down,
  ArrowLeft: DIRECTIONS.left,
  a: DIRECTIONS.left,
  A: DIRECTIONS.left,
  ArrowRight: DIRECTIONS.right,
  d: DIRECTIONS.right,
  D: DIRECTIONS.right
};

function newGame() {
  return startGame(createGame());
}

export default function SnakeGame() {
  const [game, setGame] = useState(newGame);

  const restart = useCallback(() => {
    setGame(newGame());
  }, []);

  useEffect(() => {
    if (game.status !== 'running') return undefined;

    const speed = Math.max(75, 145 - game.score * 4);
    const timer = window.setInterval(() => {
      setGame((current) => stepGame(current));
    }, speed);

    return () => window.clearInterval(timer);
  }, [game.score, game.status]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const direction = KEY_DIRECTIONS[event.key];

      if (direction && game.status === 'running') {
        event.preventDefault();
        event.stopPropagation();
        setGame((current) => changeDirection(current, direction));
        return;
      }

      if (
        (event.key === 'Enter' || event.key === ' ') &&
        (game.status === 'game-over' || game.status === 'won')
      ) {
        event.preventDefault();
        event.stopPropagation();
        restart();
      }
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [game.status, restart]);

  const occupiedCells = useMemo(() => {
    const cells = new Map();

    game.snake.forEach((segment, index) => {
      cells.set(`${segment.x}:${segment.y}`, index === 0 ? 'head' : 'snake');
    });

    if (game.food) {
      cells.set(`${game.food.x}:${game.food.y}`, 'food');
    }

    return cells;
  }, [game.food, game.snake]);

  const statusLabel = {
    running: 'RUNNING',
    'game-over': 'GAME OVER',
    won: 'BOARD CLEARED'
  }[game.status];

  return (
    <section className="snake-game" aria-label="Snake game">
      <header className="snake-game__header">
        <strong>SNAKE.EXE</strong>
        <span>Score: {game.score}</span>
        <span className={`snake-game__status snake-game__status--${game.status}`}>
          {statusLabel}
        </span>
      </header>

      <div
        className="snake-game__board"
        style={{ gridTemplateColumns: `repeat(${game.width}, 1fr)` }}
        role="img"
        aria-label={`Snake board. Score ${game.score}. Status ${statusLabel}.`}
      >
        {Array.from({ length: game.width * game.height }, (_, index) => {
          const x = index % game.width;
          const y = Math.floor(index / game.width);
          const content = occupiedCells.get(`${x}:${y}`);

          return (
            <span
              className={`snake-game__cell${content ? ` snake-game__cell--${content}` : ''}`}
              key={`${x}:${y}`}
            />
          );
        })}
      </div>

      {(game.status === 'game-over' || game.status === 'won') && (
        <button className="snake-game__restart" type="button" onClick={restart}>
          Play again
        </button>
      )}
    </section>
  );
}
