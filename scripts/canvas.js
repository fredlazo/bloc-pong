var canvas = document.getElementById("c");
var context = canvas.getContext("2d");

function Paddle(x,y,width,height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;    
}

function Player(){
  this.paddle = new Paddle(50, 250, 8, 70);   
}

function Computer(){
  this.paddle = new Paddle(1150, 250, 8, 70);   
}

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 10;
}

Paddle.prototype.render = function() {
  context.fillRect(this.x, this.y, this.width, this.height);
};

Player.prototype.render = function() {
  context.fillStyle = "#ffffff";
  this.paddle.render();
};

Computer.prototype.render = function() {
  context.fillStyle = "#ffffff";
  this.paddle.render();
};

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#ffffff";
  context.fill();
};

var player = new Player();
var computer = new Computer();
var ball = new Ball(600, 250);

var render = function() {
  player.render();
  computer.render();
  ball.render();    
};

window.onload = function(){
    render();
}