import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { BoardContent, Food, Snake, Board } from './core';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @ViewChild('gamecanvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;

  board: Board;

  refWidth: number = 640;
  refHeight: number = 480;
  cellSize: number = 20;
  vertPadding: number = 16;
  horzPadding: number = 16;
  spacing: number = 1.5;

  constructor() { }

  ngOnInit() {
    this.initSinglePlayerSnake();
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {    
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.board.snake.turnRight();
    }
    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.board.snake.turnLeft();
    }
  }

  drawBoard() {
    let canvas = this.canvas.nativeElement;
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var y = 0; y < this.board.height; y++) {
      for (var x = 0; x < this.board.width; x++) {
        switch (this.board[y][x]) {
          case BoardContent.Nothing:
            ctx.fillStyle = "#3f51b5";
            break;
          case BoardContent.Snake:
            ctx.fillStyle = "#ff4081";
            break;
          case BoardContent.Food:
            switch (this.board.food.value) {
              case 1:
                ctx.fillStyle = "#002984";
                break;
              case 2:
                ctx.fillStyle = "#001970";
                break;
              case 3:
                ctx.fillStyle = "#000051";
                break;
            }
            break;
        }
        
        ctx.fillRect(
          x * (this.cellSize + this.spacing) + this.horzPadding, 
          y * (this.cellSize + this.spacing) + this.vertPadding, 
          this.cellSize, 
          this.cellSize
        );
      }
    }
  }

  initSinglePlayerSnake(){
    let canvas = this.canvas.nativeElement;
    let ctx = canvas.getContext("2d");

    let boardWidth = 30;
    let boardHeight = 12;
    let that = this;
    function fitCanvasSize() {
      let clientHeight = document.documentElement.clientHeight;
      let clientWidth = document.documentElement.clientWidth;
      let maxWidth = (clientHeight / 9) * 16;
      canvas.width = Math.min(clientWidth, maxWidth);
      
      let min_h_padding = canvas.width * 0.03;
      that.cellSize = (canvas.width - 2 * min_h_padding - (boardWidth - 1) * that.spacing) / boardWidth;
      that.horzPadding = min_h_padding;
      that.vertPadding = min_h_padding;

      canvas.height = boardHeight * that.cellSize + (boardHeight - 1) * that.spacing + 2 * that.vertPadding;
    }

    fitCanvasSize();
    window.onresize = fitCanvasSize;

    this.board = new Board(boardWidth, boardHeight);
    this.drawBoard();

    window.setTimeout(() => this.update(), 700);
  }

  update() {
    this.board.cycle();
    if (this.board.isGameOver()) {

    } else {
      this.drawBoard();
      window.setTimeout(() => this.update(), 700);
    }
  }
}