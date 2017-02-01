var canvas = document.getElementById("c");
var context = canvas.getContext("2d");


function Paddle(x, y,width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.y_speed = 0;
}
  
function Player(){
  this.paddle = new Paddle(50, 260, 8, 70, 0);    
}

function Computer(){
  this.paddle = new Paddle(1150, 260, 8, 70, 4);   
}

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 10;
  this.x_speed = -(Math.floor(Math.random() * ((8-(5))+1) + 5)); //x speed (5 to 10)
  this.y_speed = 0;
}

var player = new Player();
var computer = new Computer();
var ball = new Ball(590, 290);


var update = function() {
  player.update();
  ball.update(player.paddle, computer.paddle);    
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

  this.y_speed = y;

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
    if(value == 38) {
      this.paddle.move(-10);
    } else if (value == 40) {
      this.paddle.move(10);
    } else {
      this.paddle.move(0);
    }
  }
};

Ball.prototype.update = function(paddle1, paddle2){
  this.x += this.x_speed;
  this.y += this.y_speed;
    
  var left_x = this.x - 10;
  var top_y = this.y - 10;
  var right_x = this.x + 10;
  var bottom_y = this.y + 10;    
 
   
  if(this.y - 10 < 0) { // hitting the top wall
    this.y = 10;
    this.y_speed = -this.y_speed;
  } else if(this.y + 10 > 600) { // hitting the bottom wall
    this.y = 590;
    this.y_speed = -this.y_speed;
  }    
    
  if(this.x < 0 || this.x > 1200) { // a point was scored
    this.x_speed = 5;
    this.y_speed = 5;
    this.x = 590;
    this.y = 290;
  }    

  if(right_x < 600) {
    if(right_x > paddle1.x && left_x < (paddle1.x + paddle1.width) && top_y > paddle1.y && bottom_y < (paddle1.y + paddle1.height)) {
      // hit the player's paddle
      this.x_speed = 10;
      this.y_speed += (paddle1.y_speed/2);
      this.x += this.x_speed;
    }
  } else {
    if(left_x < (paddle2.x) && right_x > (paddle2.x + paddle2.width) && top_y > paddle2.y && bottom_y < (paddle2.y + paddle2.height)) {
      // hit the computer's paddle
      this.x_speed = -10;
      this.y_speed += (paddle2.y_speed / 2);
      this.x += this.x_speed;
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