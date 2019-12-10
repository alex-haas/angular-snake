import { Point } from './point';
import { Board } from './board';
import { BoardContent } from './board-content.enum';

export class Food {
  position: Point;

  constructor() {}

  revive(board: Board) {
    let nextX = Math.floor(Math.random() * board.width);
    let nextY = Math.floor(Math.random() * board.height);
    if (board[nextY][nextX] == BoardContent.Nothing) {
      board[nextY][nextX] = BoardContent.Food;
    } else {
      this.revive(board);
    }
  }
}