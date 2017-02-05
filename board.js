function hasWon(val) {
    for (var x = 0; x < gridSize; x++) {
        if (threeInARow('v', x, val)) {
            return true;
        }
    }
    for (var y = 0; y < gridSize; y++) {
        if (threeInARow('h', y, val)) {
            return true;
        }
    }
    for (var i = 0; i < 2; i++) {
        if (threeInARow('o', i, val)) {
            return true;
        }
    }
    return false;
}

function threeInARow(orientation, pos, val) {
    switch (orientation) {
        case 'v':
            for (var y = 0; y < gridSize; y++) {
                if (grid[coorToPos(pos, y)] != val) {
                    return false;
                }
            }
            return true;
        case 'h':
            for (var x = 0; x < gridSize; x++) {
                if (grid[coorToPos(x, pos)] != val) {
                    return false;
                }
            }
        return true;
    case 'o':
        if (pos == 0) {
            for (var i = 0; i < gridSize; i++) {
                if (grid[coorToPos(i, i)] != val) {
                    return false;
                }
            }
            return true;
        } else if (pos == 1) {
            for (var i = 0; i < gridSize; i++) {
                if (grid[coorToPos(i, 2 - i)] != val) {
                    return false;
                }
            }
            return true;
        }
        return false;
    default:
        return false;
    }
}

function isFull() {
    for (var y = 0; y < gridSize; y++) {
        for (var x = 0; x < gridSize; x++) {
            if (grid[coorToPos(x, y)] == 0) {
                return false;
            }
        }
    }
    return true;
}

function coorToPos(x, y) {
    return y * gridSize + x;
}
