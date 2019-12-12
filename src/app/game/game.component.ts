import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Board, BoardContent } from './core';
import { AppColors } from '../constants'

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

  cellSize: number;
  vertPadding: number;
  horzPadding: number;
  spacing: number = 1.5;
  gameRunning: boolean = false;

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
            ctx.fillStyle = AppColors.EmptyCell;
            break;
          case BoardContent.Snake:
            ctx.fillStyle = AppColors.Snake;
            break;
          case BoardContent.Food:
            switch (this.board.food.value) {
              case 1:
                ctx.fillStyle = AppColors.Food1;
                break;
              case 2:
                ctx.fillStyle = AppColors.Food2;
                break;
              case 3:
                ctx.fillStyle = AppColors.Food3;
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
  }

  startGame() {
    if (this.gameRunning) {
      return;
    }
    this.gameRunning = true;
    window.setTimeout(() => this.update(), 0);
  }

  update() {
    this.board.cycle();
    if (this.board.isGameOver()) {
      this.gameRunning = false;
    } else {
      this.drawBoard();
      window.setTimeout(() => this.update(), 400);
    }
  }
}