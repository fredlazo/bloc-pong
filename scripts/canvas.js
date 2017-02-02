var canvas = document.getElementById("c");
var context = canvas.getContext("2d");

var score1 = 0;
var score2 = 0;

var endGame = false;

var lose = document.getElementById('lose');
lose.style.visibility = 'hidden';

var win = document.getElementById('win');
win.style.visibility = 'hidden';

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
  this.x_speed = -(Math.floor(Math.random() * ((8-(5))+1) + 5));
  this.y_speed = 0;
}

var player = new Player();
var computer = new Computer();
var ball = new Ball(590, 290);


var update = function() {

  player.update();
  computer.update(ball);    
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
    if (endGame == false){
      context.clearRect(0, 0, canvas.width, canvas.height);    
      update();    
      render();     
      animate(step);   
    }
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

  if(this.y < 0) { 
    this.y = 0;
    this.y_speed = 0;
  } else if (this.y + this.height > 600) {
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

Computer.prototype.update = function(ball) {
  var y_position = ball.y;
  var difference = -((this.paddle.y + (this.paddle.height / 2)) - y_position);
  if(difference < 0 && difference < -4) {
    difference = -5;
  } else if(difference > 0 && difference > 4) {
    difference = 5;
  }
  this.paddle.move(difference, 0);
  if(this.paddle.y < 0) {
    this.paddle.y = 0;
  } else if (this.paddle.y + this.paddle.height > 600) {
    this.paddle.x = 600 - this.paddle.height;
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
    
    
  if(this.x > 1200) { // Player scored
    /*this.x_speed = 5;
    this.y_speed = 5;*/
   score1++;      
   document.getElementById('score1').innerHTML = score1;
    if (score1 == 1){
        endGame = true;
        win.style.visibility = 'visible';      
    }else{
        this.x_speed = -(Math.floor(Math.random() * ((8-(5))+1) + 5)); //x speed (5 to 10)
        this.y_speed = 0;      
        this.x = 590;
        this.y = 290;
    }
  }       
    
  if(this.x < 0) { // Computer scored
    /*this.x_speed = 5;
    this.y_speed = 5;*/
      score2++;      
      document.getElementById('score2').innerHTML = score2;
    if (score2 == 2){
        endGame = true;
        lose.style.visibility = 'visible';
    }else{    
        this.x_speed = -(Math.floor(Math.random() * ((8-(5))+1) + 5)); //x speed (5 to 10)
        this.y_speed = 0;      
        this.x = 590;
        this.y = 290;
    }
  } 
    
  if(right_x < 600) {
    if(right_x > paddle1.x && left_x < (paddle1.x + paddle1.width) && top_y > (paddle1.y-15) && bottom_y < (paddle1.y + paddle1.height + 18)) {
      // hit the player's paddle
      this.x_speed = 10;
      this.y_speed += (paddle1.y_speed);
      this.x += this.x_speed;
    }
  } else {
    if(left_x < (paddle2.x) && right_x > (paddle2.x + paddle2.width) && top_y > (paddle2.y-15) && bottom_y < (paddle2.y + paddle2.height+18)) {
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