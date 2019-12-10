import { Point, BoardContent, Board, Direction } from '.';

export class Snake {
  body: Point[];
  board: Board;
  direction: Direction;
  nextDirection: Direction;

  constructor(board: Board) {
    this.board = board;

    this.body = [
      new Point(2, 2),
      new Point(3, 2),
      new Point(4, 2)
    ]
    for (let part of this.body) {
      this.board[part.y][part.x] = BoardContent.Snake;
    }

    this.nextDirection = Direction.East;
  }

  nextHeadPosition() {
    let currHead = this.body[this.body.length - 1];
    let nextHead = currHead.clone();
    switch (this.nextDirection) {
      case Direction.North:
        nextHead.y -= 1;
        break;
      case Direction.South:
        nextHead.y += 1;
        break;
      case Direction.East:
        nextHead.x += 1;
        break;
      case Direction.West:
        nextHead.x -= 1;
        break;
    }
    return nextHead;
  }

  moveTail() {
    let tail = this.body.shift();
    this.board[tail.y][tail.x] = BoardContent.Nothing;
  }

  moveHead() {
    let nextHead = this.nextHeadPosition();
    // todo: check collision
    // todo: check for food
    this.body.push(nextHead);
    this.board[nextHead.y][nextHead.x] = BoardContent.Snake;
  }

  turnLeft() {
    this.nextDirection = (this.direction + 3) % 4;
  }

  turnRight() {
    this.nextDirection = (this.direction + 1) % 4;
  }
}