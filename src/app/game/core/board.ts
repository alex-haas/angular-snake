import { BoardContent, Snake, Food } from '.';

export class BoardRow {
  [index: number] : BoardContent;
}

export class Board {
  width: number;
  height: number;
  [index: number] : BoardRow;

  snake: Snake;
  food: Food;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    for (var y = 0; y < this.height; y++) {
      this[y] = new BoardRow();
      for (var x = 0; x < this.width; x++) {
        this[y][x] = BoardContent.Nothing;
      }
    }

    this.snake = new Snake(this);
    this.food = new Food();
    this.food.revive(this);
  }

  cycle() {
    this.snake.moveTail();
    this.snake.moveHead();
  }
}