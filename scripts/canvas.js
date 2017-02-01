var canvas = document.getElementById("c");
var context = canvas.getContext("2d");


function Paddle(x, y,width, height, y_speed) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.y_speed = y_speed;
}
  
function Player(){
  this.paddle = new Paddle(50, 250, 8, 70, 4);   
}

function Computer(){
  this.paddle = new Paddle(1150, 250, 8, 70, 4);   
}

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 10;
}

var player = new Player();
var computer = new Computer();
var ball = new Ball(600, 250);


var update = function() {
  player.update();
};

var render = function() {
  player.render();
  computer.render();
  ball.render();    
};

var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback) { window.setTimeout(callback, 1000/60) };


var step = function() {
  context.clearRect(0, 0, canvas.width, canvas.height);    
  update();    
  render();     
  animate(step);   
};


var keysDown = {};

window.addEventListener("keypress", function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});


Paddle.prototype.move = function(y) {
  this.y += y;
  if(this.y < 0) { // all the way to the left
    this.y = 0;
    this.y_speed = 0;
  } else if (this.y + this.height > 600) { // all the way to the right
    this.y = 600 - this.height;
    this.y_speed = 0;
  }    
} 

Player.prototype.update = function() {
  for(var key in keysDown) {
    var value = Number(key);
    if(value == 40) {
      this.paddle.move(10);
    } else if (value == 38) {
      this.paddle.move(-10);
    } else {
      this.paddle.move(0);
    }
  }
};


Paddle.prototype.render = function() {
    context.fillRect(this.x, this.y, this.width, this.height);
  
};

Player.prototype.render = function() {
  this.paddle.render();
};

Computer.prototype.render = function() {
  this.paddle.render();
};

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#ffffff";
  context.fill();
};


window.onload = function(){
    animate(step);
}