import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DIRECTIONS,
  changeDirection,
  createGame,
  interruptGame,
  placeFood,
  startGame,
  stepGame
} from '../src/games/snakeEngine.js';

test('creates a centered snake with food on an open cell', () => {
  const game = createGame({ width: 10, height: 8, random: () => 0 });

  assert.deepEqual(game.snake[0], { x: 5, y: 4 });
  assert.equal(game.snake.length, 3);
  assert.equal(game.snake.some((segment) =>
    segment.x === game.food.x && segment.y === game.food.y
  ), false);
});

test('moves one cell in the active direction', () => {
  const game = startGame(createGame({ width: 10, height: 8 }));
  const next = stepGame(game);

  assert.deepEqual(next.snake[0], { x: 6, y: 4 });
  assert.equal(next.snake.length, 3);
});

test('accepts a turn and rejects an immediate reversal', () => {
  const game = startGame(createGame());
  const reversed = changeDirection(game, DIRECTIONS.left);
  const turned = changeDirection(game, DIRECTIONS.up);

  assert.equal(reversed, game);
  assert.equal(turned.nextDirection, DIRECTIONS.up);
  assert.deepEqual(stepGame(turned).snake[0], {
    x: game.snake[0].x,
    y: game.snake[0].y - 1
  });
});

test('grows and increments the score after eating food', () => {
  const game = {
    ...startGame(createGame({ width: 6, height: 4 })),
    snake: [{ x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }],
    food: { x: 3, y: 1 }
  };
  const next = stepGame(game, () => 0);

  assert.equal(next.snake.length, 4);
  assert.equal(next.score, 1);
  assert.notDeepEqual(next.food, { x: 3, y: 1 });
});

test('ends the game when the snake hits a wall', () => {
  const game = {
    ...startGame(createGame({ width: 5, height: 5 })),
    snake: [{ x: 4, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 2 }]
  };

  assert.equal(stepGame(game).status, 'game-over');
});

test('interrupts an active game without changing the board', () => {
  const game = startGame(createGame());
  const interrupted = interruptGame(game);

  assert.equal(interrupted.status, 'interrupted');
  assert.equal(interrupted.snake, game.snake);
  assert.equal(interruptGame(interrupted), interrupted);
});

test('reports a win when no cell remains for food', () => {
  const food = placeFood(
    [{ x: 0, y: 0 }, { x: 1, y: 0 }],
    2,
    1,
    () => 0
  );

  assert.equal(food, null);
});
