let tetris = {
    x: 4,
    y: 1,
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
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 2, 2],
        [0, 2, 2],
        [0, 0, 0],
    ],
    [
        [0, 3, 3],
        [3, 3, 0],
        [0, 0, 0],
    ],
    [
        [4, 4, 0],
        [0, 4, 4],
        [0, 0, 0],
    ],
    [
        [5, 5, 5],
        [0, 0, 5],
        [0, 0, 0],
    ],
    [
        [6, 6, 6],
        [6, 0, 0],
        [0, 0, 0],
    ],
    [
        [7, 7, 7],
        [0, 7, 0],
        [0, 0, 0],
    ],
];

function landTetrimino() {
    for (let [y, row] of tetris.tetrimino.entries()) {
        for (let [x, cell] of row.entries()) {
            tetris.board[tetris.y + y][tetris.x + x] += tetris.tetrimino[y][x];
        }
    }
}

function nextTetrimino() {
    tetris.x = 4;
    tetris.y = 1;
    tetris.tetrimino = tetriminos[Math.floor(Math.random() * tetriminos.length)];
    
    if (landed(tetris.x, tetris.y)) tetris.gameOver = true;
}

function landed(ux, uy) {
    for (let [y, row] of tetris.tetrimino.entries()) {
        for (let [x, cell] of row.entries()) {
            if (tetris.tetrimino[y][x] != 0 && tetris.board[uy + y][ux + x] != 0)
                return true;
        }
    }
    return false;
}

function fallDown() {
    if (!landed(tetris.x, tetris.y + 1)) {
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
            if (x == tetris.x && y == tetris.y) {
                drawTetrimino(tetris.tetrimino);
            }
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
}

function initTetris() {
    let canvas = document.getElementById('tetris');
    let context = canvas.getContext('2d');
    context.lineWidth = 2;
    tetris.context = context;
    tetris.tetrimino = tetriminos[Math.floor(Math.random() * tetriminos.length)];
    tetris.width = canvas.width;
    tetris.height = canvas.height;
    drawScreen();
}

window.addEventListener("load", initTetris);
window.setInterval(progress, 1000);
