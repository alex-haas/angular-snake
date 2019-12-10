import { Point, BoardContent, Board, Direction } from '.';

export class Snake {
  body: Point[];
  board: Board;
  direction: Direction;
  nextDirection: Direction;
  toGrow: number = 0;

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

  nextHeadPosition(): Point {
    let currHead = this.body[this.body.length - 1];
    let nextHead = currHead.clone();
    switch (this.direction) {
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
    if (this.toGrow > 0) {
      this.toGrow -= 1;
    } else {
      let tail = this.body.shift();
      this.board[tail.y][tail.x] = BoardContent.Nothing;
    }
  }

  moveHead() {
    this.direction = this.nextDirection;
    let nextHead = this.nextHeadPosition();
    var isDead = this.checkWallCollision(nextHead);

    let boardContent = this.board[nextHead.y][nextHead.x];
    if (boardContent == BoardContent.Snake) {
      isDead = true;
    }
    if (boardContent == BoardContent.Food) {
      this.toGrow += this.board.food.value;
      this.board.food.eaten = true;
    }
    // todo: check for food
    if (isDead) {

    } else {
      this.body.push(nextHead);
      this.board[nextHead.y][nextHead.x] = BoardContent.Snake;
    }
  }

  turnLeft() {
    this.nextDirection = (this.direction + 3) % 4;
  }

  turnRight() {
    this.nextDirection = (this.direction + 1) % 4;
  }

  checkWallCollision(nextHead: Point): boolean {
    let x_col = nextHead.x < 0 || nextHead.x >= this.board.width;
    let y_col = nextHead.y < 0 || nextHead.y >= this.board.height;
    return x_col || y_col;
  }
}