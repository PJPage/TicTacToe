function move(grid) {
    pos = blockOrWin(grid);
    if (pos != Math.pow(GRID_SIZE, 2) + 1) {
        return pos;
    } else {
        return fill(grid);
    }
}

function blockOrWin(grid) {
    for (var pos = 0; pos < Math.pow(GRID_SIZE, 2); pos++) {
        if (grid[pos] == 0) {
            grid[pos] = 2;
            if (hasWon(2)) {
                grid[pos] = 2;
                return pos;
            } else {
                grid[pos] = 0;
            }
        }
    }
    for (var pos = 0; pos < Math.pow(GRID_SIZE, 2); pos++) {
        if (grid[pos] == 0) {
            grid[pos] = 1;
            if (hasWon(1)) {
                grid[pos] = 2;
                return pos;
            } else {
                grid[pos] = 0;
            }
        }
    }
    return Math.pow(GRID_SIZE, 2) + 1;
}

function fill(grid) {
    var openSquares = [];
    for (var i = 0; i < Math.pow(GRID_SIZE, 2); i++) {
        if (grid[i] == 0) {
            openSquares.push(i);
        }
    }
    if (openSquares.length == 0) {
        return Math.pow(GRID_SIZE, 2) + 1;
    }
    var random = Math.floor(Math.random() * openSquares.length)
    return openSquares[random];
}
