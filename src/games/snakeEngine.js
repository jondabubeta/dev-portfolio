export const DIRECTIONS = Object.freeze({
  up: Object.freeze({ x: 0, y: -1 }),
  down: Object.freeze({ x: 0, y: 1 }),
  left: Object.freeze({ x: -1, y: 0 }),
  right: Object.freeze({ x: 1, y: 0 })
});

function samePosition(a, b) {
  return a.x === b.x && a.y === b.y;
}

function isOpposite(a, b) {
  return a.x + b.x === 0 && a.y + b.y === 0;
}

export function placeFood(snake, width, height, random = Math.random) {
  const openCells = [];

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (!snake.some((segment) => samePosition(segment, { x, y }))) {
        openCells.push({ x, y });
      }
    }
  }

  if (openCells.length === 0) return null;

  const index = Math.min(
    Math.floor(random() * openCells.length),
    openCells.length - 1
  );

  return openCells[index];
}

export function createGame({
  width = 18,
  height = 14,
  random = Math.random
} = {}) {
  const centerX = Math.max(2, Math.floor(width / 2));
  const centerY = Math.floor(height / 2);
  const snake = [
    { x: centerX, y: centerY },
    { x: centerX - 1, y: centerY },
    { x: centerX - 2, y: centerY }
  ];

  return {
    width,
    height,
    snake,
    food: placeFood(snake, width, height, random),
    direction: DIRECTIONS.right,
    nextDirection: DIRECTIONS.right,
    score: 0,
    status: 'ready'
  };
}

export function startGame(game) {
  if (game.status !== 'ready') return game;
  return { ...game, status: 'running' };
}

export function changeDirection(game, direction) {
  if (!direction || game.status === 'game-over' || game.status === 'won') {
    return game;
  }

  const alreadyQueued = game.nextDirection !== game.direction;
  if (alreadyQueued || isOpposite(game.direction, direction)) return game;

  return { ...game, nextDirection: direction };
}

export function stepGame(game, random = Math.random) {
  if (game.status !== 'running') return game;

  const direction = game.nextDirection;
  const head = game.snake[0];
  const nextHead = {
    x: head.x + direction.x,
    y: head.y + direction.y
  };
  const ateFood = game.food && samePosition(nextHead, game.food);
  const collisionBody = ateFood ? game.snake : game.snake.slice(0, -1);
  const hitWall =
    nextHead.x < 0 ||
    nextHead.x >= game.width ||
    nextHead.y < 0 ||
    nextHead.y >= game.height;
  const hitSelf = collisionBody.some((segment) =>
    samePosition(segment, nextHead)
  );

  if (hitWall || hitSelf) {
    return {
      ...game,
      direction,
      nextDirection: direction,
      status: 'game-over'
    };
  }

  const snake = ateFood
    ? [nextHead, ...game.snake]
    : [nextHead, ...game.snake.slice(0, -1)];
  const food = ateFood
    ? placeFood(snake, game.width, game.height, random)
    : game.food;

  return {
    ...game,
    snake,
    food,
    direction,
    nextDirection: direction,
    score: game.score + (ateFood ? 1 : 0),
    status: food === null ? 'won' : game.status
  };
}
