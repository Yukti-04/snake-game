let canvas = document.getElementById("canvas");
const ctx=canvas.getContext("2d");
let audio=document.getElementById("gameOver");
let play=document.getElementById("game");
let apple=document.getElementById("apple");
let grid=20;
var count=0;
play.play();
function destroyed(){
    setTimeout(() => {
        alert("Game Over..! Hit Enter to start again");
    }, 50);
    play.play();
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;
    apple.x = getRandomInt(0, 25) * grid;
    apple.y = getRandomInt(0, 25) * grid;

}
  var snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    
    // keep track of all grids the snake body occupies
    cells: [],
    
    // length of the snake. grows when eating an apple
    maxCells: 4
  };
  apple = {
    x: 320,
    y: 320
  };
  
  // get random whole numbers in a specific range
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  // game loop
  function loop() {
    
    requestAnimationFrame(loop);
    if (++count < 8) {
      return;
    }
    count = 0;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    snake.x += snake.dx;
    snake.y += snake.dy;
    if (snake.x < 0) {
        audio.play();
      destroyed();
    }
    else if (snake.x >= canvas.width) {
        audio.play();
        destroyed();
    }
    if (snake.y < 0) {
        audio.play();
        destroyed();
    }
    else if (snake.y >= canvas.height) {
        audio.play();
        destroyed();
    }
    snake.cells.unshift({x: snake.x, y: snake.y});
    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
    }
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, grid-1, grid-1);
    // draw snake one cell at a time
    ctx.fillStyle = 'white';
    snake.cells.forEach(function(cell, index) {
      ctx.fillRect(cell.x, cell.y, grid-1, grid-1);  
      // snake ate apple
      if (cell.x === apple.x && cell.y === apple.y) {
        snake.maxCells++;
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
      }
      for (var i = index + 1; i < snake.cells.length; i++)
      {
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) 
       { 
        audio.play();
        destroyed();
        }
      }
    }  
    );  
  }
  // listen to keyboard events to move the snake
  document.addEventListener('keydown', function(e) {
    
    // left arrow key
    if (e.which === 37 && snake.dx === 0) {
      snake.dx = -grid;
      snake.dy = 0;
    }
    // up arrow key
    else if (e.which === 38 && snake.dy === 0) {
      snake.dy = -grid;
      snake.dx = 0;
    }
    // right arrow key
    else if (e.which === 39 && snake.dx === 0) {
      snake.dx = grid;
      snake.dy = 0;
    }
    // down arrow key
    else if (e.which === 40 && snake.dy === 0) {
      snake.dy = grid;
      snake.dx = 0;
    }
  });
  
  // start the game
  requestAnimationFrame(loop);