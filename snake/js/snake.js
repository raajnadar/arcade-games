document.onreadystatechange = function () {
  'use strict';
  
  var velocityX = -1, velocityY = 0;
  var posX = 15, posY = 15;
  var chickX = 10, chickY = 10;
  var grid = 10, tiles = 30;
  var snakeBody = [], snakeLen = 5, score = 0;
  
  if (document.readyState === 'complete') {
    var canvas = document.querySelector('#SnakeGameArea');
    var context = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 320;
    
    setInterval(runGame, 100);
  }
  
  function getKeyCode(e) {
    switch (e.keyCode) {
      case 37:
        velocityX = -1;
        velocityY = 0;
        break;
      case 38:
        velocityX = 0;
        velocityY = -1;
        break;
      case 39:
        velocityX = 1;
        velocityY = 0;
        break;
      case 40:
        velocityX = 0;
        velocityY = 1;
        break;
    }
  }

  function runGame() {    
    posX += velocityX;
    posY += velocityY;

    if (posX < 0) {
      posX = tiles - 1;
    }
    if (posX > tiles - 1) {
      posX = 0;
    }
    if (posY < 0) {
      posY = tiles - 1;
    }
    if (posY > tiles - 1) {
      posY = 0;
    }
    
    context.fillStyle = 'black';
    context.fillRect(0,0, canvas.width, canvas.height);
    
    context.fillStyle = 'white';
    context.fillText("Score : " + score, 10, 315);

    context.fillStyle = 'lime';
    for (var i = 0; i < snakeBody.length; i++) {
      context.fillRect(snakeBody[i].valueX * grid, snakeBody[i].valueY * grid, grid - 2, grid - 2);
      if (snakeBody[i].valueX == posX && snakeBody[i].valueY == posY) {
        snakeLen = 5;
        score = 0;
      }
    }

    snakeBody.push({
      valueX: posX,
      valueY: posY
    });

    while (snakeBody.length > snakeLen) {
      snakeBody.shift();
    }

    if (chickX === posX && chickY === posY) {
      snakeLen = snakeLen + 1;
      score = score + 10;
      chickX = Math.floor(Math.random() * tiles);
      chickY = Math.floor(Math.random() * tiles);
    }

    context.fillStyle = 'orange';
    context.fillRect(chickX * grid, chickY * grid, grid - 2, grid  - 2);
    document.addEventListener('keydown', getKeyCode);
  }
};
