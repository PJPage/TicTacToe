//todo: preload images, better graphics, github
var c;
var ctx;
var grid; 
var usersTurn = false;

var gridSize = 3;
var boardColor = "#EEEEEE"
var pieceSize;
var offset;

function setCanvasSize() {
    if (window.innerWidth > window.innerHeight) {
        c.width = c.height = window.innerHeight * 0.8;
    } else {
        c.width = c.height = window.innerWidth * 0.8;
    }

    pieceSize = c.width / gridSize;
    offset = pieceSize / 5;
}

window.onload = function() {
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");

    setCanvasSize();

    newGame();

    requestAnimationFrame(update);
    c.addEventListener("click", function(event) {

        var rect = c.getBoundingClientRect();
        var mouseX = event.clientX - rect.left;
        var mouseY = event.clientY - rect.top;

        var x = Math.floor(mouseX / pieceSize);
        var y = Math.floor(mouseY / pieceSize);

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

    window.addEventListener("resize", setCanvasSize, false);
}

function newGame() {
    print(" ");
    grid = [];
    for (var i = 0; i < Math.pow(gridSize, 2); i++) {
        grid.push(0);
    }
    usersTurn = true;
}

function update() {
    ctx.fillStyle = boardColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawLines();

    for (var y = 0; y < gridSize; y++) {
        for (var x = 0; x < gridSize; x++) {
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
    requestAnimationFrame(update);
}

function drawLines() {
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (var i = 1; i < gridSize; i++) {
        pos = i * pieceSize;
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos, canvas.height);
        ctx.moveTo(0, pos);
        ctx.lineTo(canvas.width, pos);
    }
    ctx.stroke();
}

function drawX(x, y) {

    ctx.lineWidth = 2;

    var xLeft = x * pieceSize + offset;
    var xRight = (x + 1) * pieceSize - offset;
    var yTop = y * pieceSize + offset;
    var yBottom = (y + 1) * pieceSize - offset;

    ctx.beginPath();
    ctx.moveTo(xLeft, yTop);
    ctx.lineTo(xRight, yBottom);
    ctx.moveTo(xRight, yTop);
    ctx.lineTo(xLeft, yBottom);
    ctx.stroke();
}

function drawO(x, y) {

    ctx.lineWidth = 2;

    var centerX = x * pieceSize + pieceSize / 2;
    var centerY = y * pieceSize + pieceSize / 2;
    var radius = pieceSize / 2 - offset;

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
