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

  cellSize: number = 24;
  padding: number = 16;
  spacing: number = 1;

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
          x * (this.cellSize + this.spacing) + this.padding, 
          y * (this.cellSize + this.spacing) + this.padding, 
          this.cellSize, 
          this.cellSize
        );
      }
    }
  }

  initSinglePlayerSnake(){
    let canvas = this.canvas.nativeElement;
    let ctx = canvas.getContext("2d");

    function fitCanvasSize() {
      canvas.width = document.documentElement.clientWidth;
      canvas.height = (canvas.width / 16) * 9;
    }

    fitCanvasSize();
    window.onresize = fitCanvasSize;

    this.board = new Board(16, 9);
    this.drawBoard();

    window.setTimeout(() => this.update(), 700);
  }

  update() {
    this.board.cycle();
    this.drawBoard();

    window.setTimeout(() => this.update(), 700);
  }
}