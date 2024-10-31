const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const grid = 20;
let count = 0;
let snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};
let apple = {
    x: 320,
    y: 320
};

// 随机生成苹果的位置
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// 游戏循环
function loop() {
    requestAnimationFrame(loop);

    // 控制游戏速度
    if (++count < 4) {
        return;
    }
    count = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 移动蛇
    snake.x += snake.dx;
    snake.y += snake.dy;

    // 蛇头超出边界处理
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    // 蛇身处理
    snake.cells.unshift({x: snake.x, y: snake.y});

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    // 检查是否吃到苹果
    if (snake.x === apple.x && snake.y === apple.y) {
        snake.maxCells++;
        apple.x = getRandomInt(0, 20) * grid;
        apple.y = getRandomInt(0, 20) * grid;
    }

    // 检查是否撞到自己
    for (let i = 1; i < snake.cells.length; i++) {
        if (snake.cells[i].x === snake.x && snake.cells[i].y === snake.y) {
            snake.x = 160;
            snake.y = 160;
            snake.cells = [];
            snake.maxCells = 4;
            snake.dx = grid;
            snake.dy = 0;
            apple.x = getRandomInt(0, 20) * grid;
            apple.y = getRandomInt(0, 20) * grid;
        }
    }

    // 绘制苹果
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, grid-1, grid-1);

    // 绘制蛇
    ctx.fillStyle = 'green';
    snake.cells.forEach(function(cell, index) {
        ctx.fillRect(cell.x, cell.y, grid-1, grid-1);  
    });
}

// 按钮控制方向
document.getElementById('up').addEventListener('click', function() {
    if (snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
});
document.getElementById('down').addEventListener('click', function() {
    if (snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});
document.getElementById('left').addEventListener('click', function() {
    if (snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
});
document.getElementById('right').addEventListener('click', function() {
    if (snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
});

// 触摸控制方向
canvas.addEventListener('touchstart', function(e) {
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const rect = canvas.getBoundingClientRect();
    const canvasX = touchX - rect.left;
    const canvasY = touchY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    if (canvasY < centerY) {
        if (snake.dy === 0) {
            snake.dy = -grid;
            snake.dx = 0;
        }
    } else if (canvasY > centerY) {
        if (snake.dy === 0) {
            snake.dy = grid;
            snake.dx = 0;
        }
    } else if (canvasX < centerX) {
        if (snake.dx === 0) {
            snake.dx = -grid;
            snake.dy = 0;
        }
    } else if (canvasX > centerX) {
        if (snake.dx === 0) {
            snake.dx = grid;
            snake.dy = 0;
        }
    }
});

// 启动游戏循环
requestAnimationFrame(loop);
