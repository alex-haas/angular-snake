import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit {

  @ViewChild('maincanvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;

  constructor() {}

  ngOnInit() {
    this.initBackground();
  }

  startGame(playerCount: number) {
    
  }

  initBackground() {
    let canvas = this.canvas.nativeElement;
    let ctx = canvas.getContext("2d");
    
    function fitCanvasSize() {
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight;
    }

    fitCanvasSize();
    window.onresize = fitCanvasSize;

    var balls = [];

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var Ball = function () {
      this.r = rand(10, 18);
      this.x = rand(0 + this.r, canvas.width - this.r);
      this.y = rand(0 + this.r, canvas.height - this.r);
      this.vx = rand(0, 1) < 0.5 ? rand(-3, -1) : rand(1, 3);
      this.vy = rand(0, 1) < 0.5 ? rand(-3, -1) : rand(1, 3);
      this.opacity = Math.random();
      this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        var color = ctx.createRadialGradient(this.x, this.y, this.r * .7, this.x, this.y, this.r);
        color.addColorStop(.6, '#fffbff');
        color.addColorStop(1, '#3f51b5');
        ctx.shadowColor = "#3f51b5";
        ctx.shadowBlur = this.r * 1.3;
        ctx.fillStyle = color;
        ctx.globalAlpha = this.opacity;
        ctx.closePath();
        ctx.fill();
      };
      this.move = function () {
        if (this.x + this.r > canvas.width || this.x - this.r < 0) {
          this.vx *= -1;
        }
        if (this.y + this.r > canvas.height || this.y - this.r < 0) {
          this.vy *= -1;
        }
        this.x += this.vx;
        this.y += this.vy;
      }
    };

    function density() {
      var i;
      for (i = 0; i < 100; i++) {
        balls.push(new Ball);
      }
    };
    density();

    function update() {
      var i;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (i = 0; i < 100; i++) {
        balls[i].draw();
        balls[i].move();
      }
      setTimeout(function () {
        update();
      }, 30)
    };
    update();
  }
}