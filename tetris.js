let init_x = 3;
let init_y = 0;
let tetris = {
    x: init_x,
    y: init_y,
    gameOver: false,
    board: [
        [9, 9, 9, 0, 0, 0, 0, 0, 0, 9, 9, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    ],
};

let tetriminos = [
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0],
        [0, 2, 2, 0],
        [0, 2, 2, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 3, 3, 0],
        [0, 3, 3, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 4, 4, 0, 0],
        [0, 0, 4, 4, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 5, 5, 5, 0],
        [0, 0, 0, 5, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 6, 0],
        [0, 6, 6, 6, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 7, 0],
        [0, 7, 7, 7, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
];

function isCompleted(y) {
    for (let i = 0; i < tetris.width; i++) {
        if (tetris.board[y][i] == 0) return false;
    }
    return true;
}

function lineClear() {
    let completedLines = [];
    for (let i = tetris.y; i < tetris.board.length - 1 && i < tetris.y + tetris.tetrimino.length; i++) {
        if (isCompleted(i)) completedLines.push(i);
    }
    console.log(completedLines);
    for (let completedLine of completedLines) {
        for (let y = completedLine; y > 1; y--) {
            for (let x = 1; x < tetris.width - 2; x++) {
                tetris.board[y][x] = tetris.board[y - 1][x];
            }
        }
    }
}

function landTetrimino() {
    for (let [y, row] of tetris.tetrimino.entries()) {
        for (let [x, cell] of row.entries()) {
            if (tetris.y + y > 21) continue;
            tetris.board[tetris.y + y][tetris.x + x] += tetris.tetrimino[y][x];
        }
    }
    lineClear();
}

function nextTetrimino() {
    tetris.x = init_x;
    tetris.y = init_y;
    tetris.tetrimino = tetriminos[Math.floor(Math.random() * tetriminos.length)];
    if (tetris.tetrimino.length == 4) tetris.x++;
    
    if (isOverlapped(tetris.x, tetris.y, tetris.tetrimino)) tetris.gameOver = true;
}

function isOverlapped(ux, uy, tetrimino) {
    for (let [y, row] of tetris.tetrimino.entries()) {
        for (let [x, cell] of row.entries()) {
            if (tetrimino[y][x] != 0 && tetris.board[uy + y][ux + x] != 0)
                return true;
        }
    }
    return false;
}

function fallDown() {
    if (!isOverlapped(tetris.x, tetris.y + 1, tetris.tetrimino)) {
        tetris.y++;
    } else {
        landTetrimino();
        nextTetrimino();
    }
}

function progress() {
    if (tetris.gameOver) return;
    fallDown();
    drawScreen();
}

function drawTetrimino(tetrimino) {
    for (let [y, row] of tetrimino.entries()) {
        for (let [x, cell] of row.entries()) {
            if (cell == 0) continue;
            tetris.context.beginPath();
            switch (cell) {
                case 1:
                    tetris.context.fillStyle = "lightblue";
                    break;
                case 2:
                    tetris.context.fillStyle = "yellow";
                    break;
                case 3:
                    tetris.context.fillStyle = "green";
                    break;
                case 4:
                    tetris.context.fillStyle = "red";
                    break;
                case 5:
                    tetris.context.fillStyle = "blue";
                    break;
                case 6:
                    tetris.context.fillStyle = "orange";
                    break;
                case 7:
                    tetris.context.fillStyle = "purple";
                    break;
            }
            tetris.context.rect((tetris.x + x) * 20, (tetris.y + y) * 20, 20, 20);
            tetris.context.fill();
            tetris.context.stroke();
        }
    }
}

function drawScreen() {
    tetris.context.clearRect(0, 0, tetris.width, tetris.height);
    for (let [y, row] of tetris.board.entries()) {
        for (let [x, cell] of row.entries()) {
            if (cell == 0) continue;
            tetris.context.beginPath();
            switch (cell) {
                case 1:
                    tetris.context.fillStyle = "lightblue";
                    break;
                case 2:
                    tetris.context.fillStyle = "yellow";
                    break;
                case 3:
                    tetris.context.fillStyle = "green";
                    break;
                case 4:
                    tetris.context.fillStyle = "red";
                    break;
                case 5:
                    tetris.context.fillStyle = "blue";
                    break;
                case 6:
                    tetris.context.fillStyle = "orange";
                    break;
                case 7:
                    tetris.context.fillStyle = "purple";
                    break;
                case 9:
                    tetris.context.fillStyle = "gray";
                    break;
            }
            tetris.context.rect(x * 20, y * 20, 20, 20);
            tetris.context.fill();
            tetris.context.stroke();
        }
    }
    drawTetrimino(tetris.tetrimino);
}

function initTetris() {
    let canvas = document.getElementById('tetris');
    let context = canvas.getContext('2d');
    context.lineWidth = 2;
    tetris.context = context;
    tetris.tetrimino = tetriminos[Math.floor(Math.random() * tetriminos.length)];
    if (tetris.tetrimino.length == 4) tetris.x++;
    tetris.width = canvas.width;
    tetris.height = canvas.height;
    drawScreen();
}

function rotateRight() {
    let width = tetris.tetrimino[0].length;
    let height = tetris.tetrimino.length;
    let new_tetrimino = Array(width);
    for (let [y, row] of tetris.tetrimino.entries()) {
        new_tetrimino[y] = Array(height);
    }
    for (let [y, row] of tetris.tetrimino.entries()) {
        for (let [x, cell] of row.entries()) {
            new_tetrimino[x][width - 1 - y] = tetris.tetrimino[y][x];
        }
    }
    return new_tetrimino;
}

function handleKeydown(event) {
    switch (event.key) {
        case "ArrowLeft":
            if (!isOverlapped(tetris.x - 1, tetris.y, tetris.tetrimino)) tetris.x--;
            break;
        case "ArrowRight":
            if (!isOverlapped(tetris.x + 1, tetris.y, tetris.tetrimino)) tetris.x++
            break;
        case "ArrowDown":
            if (!isOverlapped(tetris.x, tetris.y + 1, tetris.tetrimino)) tetris.y++
            break;
        case "ArrowUp":
            let new_tetrimino = rotateRight();
            if (!isOverlapped(tetris.x, tetris.y, new_tetrimino)) tetris.tetrimino = new_tetrimino;
            break;
    }
    drawScreen();
}

window.addEventListener("load", initTetris);
window.addEventListener("keydown", handleKeydown);
window.setInterval(progress, 1000);
