import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Board } from './core/board';
import { Snake } from './core/snake';
import { Food } from './core/food';
import { BoardContent } from './core/board-content.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @ViewChild('gamecanvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;

  board: Board;
  snake: Snake;
  food: Food;

  cellSize: number = 24;
  padding: number = 16;
  spacing: number = 1;

  constructor() { }

  ngOnInit() {
    this.initSinglePlayerSnake();
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
    this.snake = new Snake(this.board);
    this.food = new Food();
    this.food.revive(this.board);

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
            ctx.fillStyle = "#002984";
            break;
        }
        
        ctx.fillRect(x * (this.cellSize + this.spacing) + this.padding, y * (this.cellSize + this.spacing) + this.padding, this.cellSize, this.cellSize);
      }
    }
  }

}