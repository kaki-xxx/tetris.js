let tetris = {
    x: 4,
    x: 4,
    y: 1,
    board: [
        [2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ],
};

let tetrimino = {
    I: [
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    O: [
        [1, 1],
        [1, 1],
    ],
    S: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    Z: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    J: [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 0],
    ],
    L: [
        [1, 1, 1],
        [1, 0, 0],
        [0, 0, 0],
    ],
    T: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
    ],
};

function drawTetrimino(tetrimino) {
    for (let [y, row] of tetrimino.entries()) {
        for (let [x, cell] of row.entries()) {
            if (cell == 1) {
                tetris.context.beginPath();
                tetris.context.fillStyle = "lightblue";
                tetris.context.rect((tetris.x + x) * 20, (tetris.y + y) * 20, 20, 20);
                tetris.context.fill();
                tetris.context.stroke();
            }
        }
    }
}

function drawScreen() {
    for (let [y, row] of tetris.board.entries()) {
        for (let [x, cell] of row.entries()) {
            if (x == tetris.x && y == tetris.y) {
                drawTetrimino(tetris.tetrimino);
            }
            switch (cell) {
                case 2:
                    tetris.context.beginPath();
                    tetris.context.fillStyle = "gray";
                    tetris.context.rect(x * 20, y * 20, 20, 20);
                    tetris.context.fill();
                    tetris.context.stroke();
                    break;
            }
        }
    }
}

function initTetris() {
    let canvas = document.getElementById('tetris');
    let context = canvas.getContext('2d');
    context.lineWidth = 2;
    tetris.context = context;
    tetris.tetrimino = tetrimino.I;
    drawScreen();
}

window.addEventListener("load", initTetris);
