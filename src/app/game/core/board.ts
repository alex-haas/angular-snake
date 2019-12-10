import { BoardContent } from './board-content.enum';

class BoardRow {
  [index: number] : BoardContent;
}

export class Board {
  width: number;
  height: number;
  [index: number] : BoardRow;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    //this.data = Array(this.height).fill(0).map((x,i)=>Array(this.width));
    for (var y = 0; y < this.height; y++) {
      this[y] = new BoardRow();
      for (var x = 0; x < this.width; x++) {
        this[y][x] = BoardContent.Nothing;
      }
    }
  }
}