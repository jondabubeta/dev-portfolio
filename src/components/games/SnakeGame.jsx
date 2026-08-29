import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DIRECTIONS,
  changeDirection,
  createGame,
  interruptGame,
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
  return createGame();
}

export default function SnakeGame() {
  const [game, setGame] = useState(newGame);
  const gameRef = useRef(null);

  useEffect(() => {
    let secondFrame;
    gameRef.current?.focus({ preventScroll: true });
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        gameRef.current?.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
    };
  }, []);

  const turn = useCallback((direction) => {
    setGame((current) => {
      if (current.status !== 'ready' && current.status !== 'running') {
        return current;
      }

      const next = changeDirection(current, direction);
      return current.status === 'ready' ? startGame(next) : next;
    });
  }, []);

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

  const handleKeyDown = useCallback((event) => {
    if (event.ctrlKey && event.key.toLowerCase() === 'c') {
      event.preventDefault();
      event.stopPropagation();
      setGame((current) => interruptGame(current));
      window.dispatchEvent(new CustomEvent('terminal:focus'));
      return;
    }

    const direction = KEY_DIRECTIONS[event.key];

    if (
      direction &&
      (game.status === 'ready' || game.status === 'running')
    ) {
      event.preventDefault();
      event.stopPropagation();
      turn(direction);
      return;
    }

    if (
      (event.key === 'Enter' || event.key === ' ') &&
      (
        game.status === 'game-over' ||
        game.status === 'won' ||
        game.status === 'interrupted'
      )
    ) {
      event.preventDefault();
      event.stopPropagation();
      restart();
    }
  }, [game.status, restart, turn]);

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
    ready: 'READY',
    running: 'RUNNING',
    'game-over': 'GAME OVER',
    won: 'BOARD CLEARED',
    interrupted: 'INTERRUPTED'
  }[game.status];

  return (
    <section
      ref={gameRef}
      className="snake-game"
      aria-label="Snake game"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={(event) => {
        event.stopPropagation();
        gameRef.current?.focus({ preventScroll: true });
      }}
    >
      <header className="snake-game__header">
        <strong>SNAKE.EXE</strong>
        <span>Score: {game.score}</span>
        <span
          className={`snake-game__status snake-game__status--${game.status}`}
          aria-live="polite"
        >
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

      <div className="snake-game__controls" aria-label="Snake controls">
        <button
          className="snake-game__control snake-game__control--up"
          type="button"
          aria-label="Move up"
          title="Move up"
          onPointerDown={(event) => event.preventDefault()}
          onClick={(event) => {
            event.stopPropagation();
            turn(DIRECTIONS.up);
          }}
        >
          {"^"}
        </button>
        <button
          className="snake-game__control snake-game__control--left"
          type="button"
          aria-label="Move left"
          title="Move left"
          onPointerDown={(event) => event.preventDefault()}
          onClick={(event) => {
            event.stopPropagation();
            turn(DIRECTIONS.left);
          }}
        >
          {"<-"}
        </button>
        <button
          className="snake-game__control snake-game__control--down"
          type="button"
          aria-label="Move down"
          title="Move down"
          onPointerDown={(event) => event.preventDefault()}
          onClick={(event) => {
            event.stopPropagation();
            turn(DIRECTIONS.down);
          }}
        >
          {"v"}
        </button>
        <button
          className="snake-game__control snake-game__control--right"
          type="button"
          aria-label="Move right"
          title="Move right"
          onPointerDown={(event) => event.preventDefault()}
          onClick={(event) => {
            event.stopPropagation();
            turn(DIRECTIONS.right);
          }}
        >
          {"->"}
        </button>
      </div>

      {(
        game.status === 'game-over' ||
        game.status === 'won' ||
        game.status === 'interrupted'
      ) && (
        <button className="snake-game__restart" type="button" onClick={restart}>
          Play again
        </button>
      )}
    </section>
  );
}
