document.onreadystatechange = function () {
  'use strict';

  var area, snake, chicken, scorebg, over, lock = false;
  var velocityX = -1, velocityY = 0;
  var posX = 15, posY = 15;
  var chickX = 10, chickY = 10;
  var grid = 10, tiles = 30;
  var snakeBody = [], snakeLen = 5, score = 0;

  if (document.readyState === 'complete') {
    var controller = {
      canvas : document.querySelector('#SnakeGameArea'),
      start : function() {
        this.canvas.width = 300;
        this.canvas.height = 320;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(runGame, 100);
      },
      clear: function() {
        clearInterval(this.interval);
        controller.context.fillStyle = 'white';
        controller.context.fillText('Game Over!', (controller.canvas.width / 2) - 20, controller.canvas.height / 2);
      }
    }

    controller.start();
  }

  function getDirection(e) {
    if (lock == false) {
      switch (e.keyCode) {
        case 37:
          if (velocityX !== 1) {
            velocityX = -1;
            velocityY = 0;
            lock = true;
          }
          break;
        case 38:
          if (velocityY !== 1) {
            velocityX = 0;
            velocityY = -1;
            lock = true;
          }
          break;
        case 39:
          if (velocityX !== -1) {
            velocityX = 1;
            velocityY = 0;
            lock = true;
          }
          break;
        case 40:
          if (velocityY !== -1) {
            velocityX = 0;
            velocityY = 1;
            lock = true;
          }
          break;
      }
    }
  }

  function component(name, context, color, px, py, width, height) {
    controller.context.fillStyle = color;
    if (name === 'area') {
      context.fillRect(px, py, width, height);
    } else if (name === 'snake') {
      context.fillRect(px, py, width, height);
    } else if (name === 'chicken') {
      context.fillRect(px, py, width, height);
    } else if (name === 'scorebg') {
      context.fillRect(px, py, width, height);
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

    area = new component('area', controller.context, 'black', 0, 0 , controller.canvas.width, controller.canvas.height - 20);

    scorebg = new component('scorebg', controller.context, 'blue', 0, 300, controller.canvas.width, 20);

    controller.context.fillStyle = 'white';
    controller.context.fillText("Score : " + score, 8, 314);

    for (var i = 0; i < snakeBody.length; i++) {
      snake = new component('snake', controller.context, 'lime', snakeBody[i].valueX * grid, snakeBody[i].valueY * grid, grid - 2, grid - 2);
      if (snakeBody[i].valueX == posX && snakeBody[i].valueY == posY) {
        controller.clear();
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

    chicken = new component('chicken', controller.context, 'orange', chickX * grid, chickY * grid, grid - 2, grid - 2);
    document.addEventListener('keydown', getDirection);

    if (lock) {
      lock = false;
    }
  }
};
