const gameArea = document.getElementById('gameArea');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const scoreDisplay = document.getElementById('score');

let snake = [{x: 5, y: 5}];
let food = {x: 10, y: 10};
let direction = 'right';
let gameInterval;
let score = 0;
let speed = 300;

function createSnakeSegment(x, y) {
    const segment = document.createElement('div');
    segment.classList.add('snake');
    segment.style.left = `${x * 10}px`;
    segment.style.top = `${y * 10}px`;
    gameArea.appendChild(segment);
    return segment;
}

function createFood(x, y) {
    const foodElement = document.createElement('div');
    foodElement.classList.add('food');
    foodElement.style.left = `${x * 10}px`;
    foodElement.style.top = `${y * 10}px`;
    gameArea.appendChild(foodElement);
    return foodElement;
}

function updateGame() {
    const head = {...snake[0]};
    switch(direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        updateScore();
        gameArea.removeChild(gameArea.lastChild);
        placeFood();
    } else {
        const tail = snake.pop();
        gameArea.removeChild(gameArea.children[snake.length]);
    }

    if (head.x < 0 || head.x >= 30 || head.y < 0 || head.y >= 30 || collision(head)) {
        clearInterval(gameInterval);
        alert('游戏结束');
        return;
    }

    createSnakeSegment(head.x, head.y);
}

function placeFood() {
    food.x = Math.floor(Math.random() * 30);
    food.y = Math.floor(Math.random() * 30);
    createFood(food.x, food.y);
}

function collision(head) {
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
}

function updateScore() {
    score += 10;
    scoreDisplay.textContent = `得分: ${score}`;
}

function initGame() {
    gameArea.innerHTML = '';
    snake = [{x: 5, y: 5}];
    direction = 'right';
    score = 0;
    scoreDisplay.textContent = `得分: ${score}`;
    placeFood();
    gameInterval = setInterval(updateGame, speed);
}

startPauseButton.addEventListener('click', () => {
    if (!gameInterval) {
        initGame();
        startPauseButton.textContent = '暂停';
    } else {
        clearInterval(gameInterval);
        gameInterval = null;
        startPauseButton.textContent = '开始';
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(gameInterval);
    gameInterval = null;
    startPauseButton.textContent = '开始';
    initGame();
});

// 控制方向
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});
