//todo: preload images, better graphics, github
var c;
var ctx;
var grid; 
var usersTurn = false;

var PIECE_SIZE = 104;
var OFFSET = 2;
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
    print("");
    grid = [];
    for (var i = 0; i < Math.pow(GRID_SIZE, 2); i++) {
        grid.push(0);
    }
    usersTurn = true;
}

function update() {
    ctx.fillStyle = "gray";
    ctx.fillRect(OFFSET, OFFSET, c.width - 2 * OFFSET, c.height - 2 * OFFSET);

    for (var y = 0; y < GRID_SIZE; y++) {
        for (var x = 0; x < GRID_SIZE; x++) {
            switch (grid[coorToPos(x, y)]) {
                case 0:
                    ctx.fillStyle = "white";
                    ctx.fillRect(x * PIECE_SIZE + OFFSET, y * PIECE_SIZE + OFFSET, 100, 100);
                    break;
                case 1:
                    displayImage("x.png", x * PIECE_SIZE + OFFSET, y * PIECE_SIZE + OFFSET);
                    break;
                case 2:
                    displayImage("o.png", x * PIECE_SIZE + OFFSET, y * PIECE_SIZE + OFFSET);
                    break;
            }
        }
    }
}

function displayImage(src, xpos, ypos) {
    var img = document.createElement("img");
    img.src = src;
    img.width = PIECE_SIZE;
    img.height = PIECE_SIZE;

    ctx.drawImage(img, xpos, ypos);
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
