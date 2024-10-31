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
let score = 0;
let gameInterval;
let isPaused = true;

// 随机生成苹果的位置
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// 游戏循环
function loop() {
    if (isPaused) return;

    requestAnimationFrame(loop);

    // 控制游戏速度
    if (++count < 6) { // 调整这个值来控制速度
        return;
    }
    count = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制网格
    ctx.strokeStyle = '#ddd'; // 网格颜色设置为浅灰色
    for (let i = grid; i < canvas.width; i += grid) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }

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
        score += 10;
        document.getElementById('score').innerText = '得分: ' + score;
        apple.x = getRandomInt(0, 20) * grid;
        apple.y = getRandomInt(0, 20) * grid;
    }

    // 检查是否撞到自己
    for (let i = 1; i < snake.cells.length; i++) {
        if (snake.cells[i].x === snake.x && snake.cells[i].y === snake.y) {
            isPaused = true;
            alert('游戏结束! 你的得分: ' + score);
            snake.x = 160;
            snake.y = 160;
            snake.cells = [];
            snake.maxCells = 4;
            snake.dx = grid;
            snake.dy = 0;
            score = 0;
            document.getElementById('score').innerText = '得分: ' + score;
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

// 开始/暂停游戏
document.getElementById('startPause').addEventListener('click', function() {
    isPaused = !isPaused;
    if (isPaused) {
        this.innerText = '开始';
    } else {
        this.innerText = '暂停';
        requestAnimationFrame(loop);
    }
});

// 重置游戏
document.getElementById('reset').addEventListener('click', function() {
    isPaused = true;
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;
    score = 0;
    document.getElementById('score').innerText = '得分: ' + score;
    apple.x = getRandomInt(0, 20) * grid;
    apple.y = getRandomInt(0, 20) * grid;
    this.innerText = '重置';
    document.getElementById('startPause').innerText = '开始';
});
