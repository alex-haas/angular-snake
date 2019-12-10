import { Point } from './point';
import { BoardContent } from './board-content.enum';
import { Board } from './board';

export class Snake {
  body: Point[];
  board: Board;
  direction: number;

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
  }

  moveTail() {
    let tail = this.body.pop();
    this.board[tail.y][tail.x] = BoardContent.Nothing;
  }

  moveHead() {

  }
}