//todo: preload images, better graphics, github
var c;
var ctx;
var grid; 
var usersTurn = false;

var PIECE_SIZE = 104;
var OFFSET = 20;
var GRID_SIZE  = 3;

window.onload = function() {
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");

    c.width  = GRID_SIZE * PIECE_SIZE;
    c.height = GRID_SIZE * PIECE_SIZE;

    newGame();

    setInterval(update, 1000/30);
    c.addEventListener("click", function(event) {

        var rect = c.getBoundingClientRect();
        var mouseX = event.clientX - rect.left;
        var mouseY = event.clientY - rect.top;

        var x = Math.floor(mouseX / PIECE_SIZE);
        var y = Math.floor(mouseY / PIECE_SIZE);

        if (usersTurn) {
            if (grid[coorToPos(x, y)] == 0) {
                grid[coorToPos(x, y)] = 1;
                usersTurn = false;
                if (!checkVictory()) {
                    setTimeout(function() { 
                        grid[move(grid)] = 2; 
                        if (!checkVictory()) {
                            usersTurn = true; 
                        }
                    }, 100);
                }
            }
        }

    }, false);
}

function newGame() {
    print(" ");
    grid = [];
    for (var i = 0; i < Math.pow(GRID_SIZE, 2); i++) {
        grid.push(0);
    }
    usersTurn = true;
}

function update() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawLines();

    for (var y = 0; y < GRID_SIZE; y++) {
        for (var x = 0; x < GRID_SIZE; x++) {
            switch (grid[coorToPos(x, y)]) {
                case 1:
                    drawX(x, y);
                    break;
                case 2:
                    drawO(x, y);
                    break;
            }
        }
    }
}

function drawLines() {
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (var i = 1; i < GRID_SIZE; i++) {
        pos = i * PIECE_SIZE;
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos, canvas.height);
        ctx.moveTo(0, pos);
        ctx.lineTo(canvas.width, pos);
    }
    ctx.stroke();
}

function drawX(x, y) {

    ctx.lineWidth = 2;

    var xLeft = x * PIECE_SIZE + OFFSET;
    var xRight = (x + 1) * PIECE_SIZE - OFFSET;
    var yTop = y * PIECE_SIZE + OFFSET;
    var yBottom = (y + 1) * PIECE_SIZE - OFFSET;

    ctx.beginPath();
    ctx.moveTo(xLeft, yTop);
    ctx.lineTo(xRight, yBottom);
    ctx.moveTo(xRight, yTop);
    ctx.lineTo(xLeft, yBottom);
    ctx.stroke();
}

function drawO(x, y) {

    ctx.lineWidth = 2;

    var centerX = x * PIECE_SIZE + PIECE_SIZE / 2;
    var centerY = y * PIECE_SIZE + PIECE_SIZE / 2;
    var radius = PIECE_SIZE / 2 - OFFSET;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function checkVictory() {
    if (hasWon(1)) {
        print("You Won!");
        return true;
    }
    else if (hasWon(2)) {
        print("You Lost.");
        return true;
    }
    else if (isFull(grid)) {
        print("Cat's game.");
        return true;
    }
    return false;
}

function print(message) {
    document.getElementById("message").innerHTML = message;
}
