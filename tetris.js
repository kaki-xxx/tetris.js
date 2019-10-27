// 初期化、ゲームの状態を保存する変数の定義

let INIT_X = 3;
let INIT_Y = 0;

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
        [0, 0, 0, 0, 0],
        [0, 5, 5, 5, 0],
        [0, 0, 0, 5, 0],
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
        [0, 0, 7, 0, 0],
        [0, 7, 7, 7, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
];

let tetris = {
};

function initTetris() {
    let canvas = document.getElementById('tetris');
    let context = canvas.getContext('2d');
    context.lineWidth = 2;
    context.font = "15px sans-serif";

    tetris.x = INIT_X;
    tetris.y = INIT_Y;
    tetris.gameOver = false;
    tetris.score = 0;
    tetris.lines = 0;
    tetris.board = [
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
    ];
    tetris.context = context;
    tetris.tetrimino = tetriminos[Math.floor(Math.random() * tetriminos.length)];
    if (tetris.tetrimino.length == 4) tetris.x++;
    tetris.width = 340;
    tetris.height = 440;
    tetris.sidebarWidth = 100;
    tetris.touchX = 0;
    tetris.touchY = 0;

    drawScreen();
}

window.addEventListener("load", initTetris);

// ラインクリア処理

function lineClear() {
    let completedLines = [];
    for (let i = tetris.y; i < tetris.board.length - 1 && i < tetris.y + tetris.tetrimino.length; i++) {
        if (isCompleted(i)) completedLines.push(i);
    }
    switch (completedLines.length) {
        case 1:
            tetris.score += 40;
            break;
        case 2:
            tetris.score += 100;
            break;
        case 3:
            tetris.score += 300;
            break;
        case 4:
            tetris.score += 1200;
            break;
    }
    tetris.lines += completedLines.length;
    for (let completedLine of completedLines) {
        for (let y = completedLine; y > 1; y--) {
            for (let x = 1; x < tetris.width - 2; x++) {
                tetris.board[y][x] = tetris.board[y - 1][x];
            }
        }
    }
}

function isCompleted(y) {
    for (let i = 0; i < tetris.width; i++) {
        if (tetris.board[y][i] == 0) return false;
    }
    return true;
}

// ぶつかり判定

function isOverlapped(ux, uy, tetrimino) {
    for (let [y, row] of tetris.tetrimino.entries()) {
        for (let [x, cell] of row.entries()) {
            if (tetrimino[y][x] != 0 && tetris.board[uy + y][ux + x] != 0)
                return true;
        }
    }
    return false;
}

// ブロックの落下、固定、次のブロックを呼び出す処理

function progress() {
    if (tetris.gameOver) {
        clearInterval(tetris.progressTimer);
        return;
    }
    fallDown();
    drawScreen();
}

tetris.progressTimer = window.setInterval(progress, 1000);

function fallDown() {
    if (!isOverlapped(tetris.x, tetris.y + 1, tetris.tetrimino)) {
        tetris.y++;
    } else {
        fixTetrimino();
        nextTetrimino();
    }
}

function fixTetrimino() {
    for (let [y, row] of tetris.tetrimino.entries()) {
        for (let [x, cell] of row.entries()) {
            if (tetris.y + y > 21) continue;
            tetris.board[tetris.y + y][tetris.x + x] += tetris.tetrimino[y][x];
        }
    }
    lineClear();
}

function nextTetrimino() {
    tetris.x = INIT_X;
    tetris.y = INIT_Y;
    tetris.tetrimino = tetriminos[Math.floor(Math.random() * tetriminos.length)];
    if (tetris.tetrimino.length == 4) tetris.x++;

    if (isOverlapped(tetris.x, tetris.y, tetris.tetrimino)) tetris.gameOver = true;
}

// 画面の表示処理

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
            tetris.context.rect(tetris.sidebarWidth + x * 20, y * 20, 20, 20);
            tetris.context.fill();
            tetris.context.stroke();
        }
    }
    drawTetrimino(tetris.tetrimino);
    drawLeftSidebar();
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
            tetris.context.rect(tetris.sidebarWidth + (tetris.x + x) * 20, (tetris.y + y) * 20, 20, 20);
            tetris.context.fill();
            tetris.context.stroke();
        }
    }
}

function drawLeftSidebar() {
    tetris.context.beginPath();
    tetris.context.fillStyle = "black";
    tetris.context.fillText("SCORE", 5, 70);
    tetris.context.textAlign = "right";
    tetris.context.fillText(tetris.score, 90, 85);
    tetris.context.textAlign = "left";
    tetris.context.fillText("LINES", 5, 130);
    tetris.context.textAlign = "right";
    tetris.context.fillText(tetris.lines, 90, 145);
    tetris.context.textAlign = "start";
}

// プレイヤーの操作を受け付ける処理

let CONTROL_TYPE = {
    MOVE_LEFT: 1,
    MOVE_RIGHT: 2,
    MOVE_DOWN: 3,
    ROTATE_LEFT: 4,
    ROTATE_RIGHT: 5,
}

function handleKeydown(event) {
    switch (event.key) {
        case "ArrowLeft":
            controlTetriminio(CONTROL_TYPE.MOVE_LEFT);
            break;
        case "ArrowRight":
            controlTetriminio(CONTROL_TYPE.MOVE_RIGHT);
            break;
        case "ArrowDown":
            controlTetriminio(CONTROL_TYPE.MOVE_DOWN);
            break;
        case "x":
            controlTetriminio(CONTROL_TYPE.ROTATE_LEFT);
            break;
        case "z":
            controlTetriminio(CONTROL_TYPE.ROTATE_LEFT);
            break;
    }
}

window.addEventListener("keydown", handleKeydown);

function handleStarttouch(event) {
    let touch = event.changedTouches[0];
    tetris.touchX = touch.pageX;
    tetris.touchY = touch.pageY;
}

window.addEventListener("touchstart", handleStarttouch);

function handleTouchmove(event) {
    if (tetris.moveDownTimer) return;
    let touch = event.changedTouches[0];
    let newTouchY = touch.pageY;

    if (newTouchY > tetris.touchX + 200) {
        tetris.moveDownTimer = setInterval(function () {
            controlTetriminio(CONTROL_TYPE.MOVE_DOWN);
        }, 50);
    };
}

window.addEventListener("touchmove", handleTouchmove);

function handleEndtouch(event) {
    if (tetris.moveDownTimer) {
        clearInterval(tetris.moveDownTimer);
        tetris.moveDownTimer = null;
        return;
    }

    let touch = event.changedTouches[0];
    let newTouchX = touch.pageX;
    let newTouchY = touch.pageY;
    let moveX = Math.abs(tetris.touchX - newTouchX);
    let moveY = Math.abs(tetris.touchY - newTouchY);

    if (moveX < 20 && moveY < 20) {
        controlTetriminio(CONTROL_TYPE.ROTATE_RIGHT);
        return;
    }
    if (tetris.touchX < newTouchX) {
        controlTetriminio(CONTROL_TYPE.MOVE_RIGHT);
        return;
    }
    if (tetris.touchX > newTouchX) {
        controlTetriminio(CONTROL_TYPE.MOVE_LEFT);
        return;
    }

}

window.addEventListener("touchend", handleEndtouch);
window.addEventListener("touchmove", function (event) {
    event.preventDefault();
}, {passive: false});

function controlTetriminio(controlType) {
    let new_tetrimino;
    switch (controlType) {
        case CONTROL_TYPE.MOVE_LEFT:
            if (!isOverlapped(tetris.x - 1, tetris.y, tetris.tetrimino)) tetris.x--;
            break;
        case CONTROL_TYPE.MOVE_RIGHT:
            if (!isOverlapped(tetris.x + 1, tetris.y, tetris.tetrimino)) tetris.x++
            break;
        case CONTROL_TYPE.MOVE_DOWN:
            if (!isOverlapped(tetris.x, tetris.y + 1, tetris.tetrimino)) tetris.y++
            break;
        case CONTROL_TYPE.ROTATE_RIGHT:
            new_tetrimino = rotateRight();
            if (!isOverlapped(tetris.x, tetris.y, new_tetrimino)) tetris.tetrimino = new_tetrimino;
            break;
        case CONTROL_TYPE.ROTATE_LEFT:
            new_tetrimino = rotateLeft();
            if (!isOverlapped(tetris.x, tetris.y, new_tetrimino)) tetris.tetrimino = new_tetrimino;
            break;
    }
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

function rotateLeft() {
    let width = tetris.tetrimino[0].length;
    let height = tetris.tetrimino.length;
    let new_tetrimino = Array(width);
    for (let [y, row] of tetris.tetrimino.entries()) {
        new_tetrimino[y] = Array(height);
    }
    for (let [y, row] of tetris.tetrimino.entries()) {
        for (let [x, cell] of row.entries()) {
            new_tetrimino[height - 1 - x][y] = tetris.tetrimino[y][x];
        }
    }
    return new_tetrimino;
}
