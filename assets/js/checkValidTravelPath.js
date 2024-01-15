function zeroOrUndefined(value) {
    return value === 0 || typeof value === 'undefined';
}

/**
 * Checki if the x, y diff would place the character in a valid location
 * Prevents movement into empty space and getting off the block edges.
 *
 * @param {*} map - map matrix
 * @param {Location} location - character location (x, y)
 * @param {*} diffX - change in x
 * @param {*} diffY - change in y
 * @returns boolean
 */

function checkValidTravelPath(map, location, diffX, diffY) {
    // Ensure the character does not move off an edge midway through a block
    if (location.x.toString().includes('.5')) {
        if (diffY != 0) {
            return false;
        }
    }
    if (location.y.toString().includes('.5')) {
        if (diffX != 0) {
            return false;
        }
    }

    // Ensure the character does not move into empty space or off the map
    if (diffY !== 0) {
        if (location.y.toString().includes('.5')) {
            // assume we've checked before entering the half block.
        } else {
            // Handle edge cases too
            // [0, 1, 0],
            //    x
            // [0, 1, 0],
            if (diffY > 0) {
                if (
                    typeof map[location.y] === 'undefined' ||
                    (zeroOrUndefined(map[location.y][location.x]) &&
                        zeroOrUndefined(map[location.y][location.x - 1]))
                ) {
                    return false;
                }
            } else {
                if (
                    typeof map[location.y - 1] === 'undefined' ||
                    (zeroOrUndefined(map[location.y - 1][location.x]) &&
                        zeroOrUndefined(map[location.y - 1][location.x - 1]))
                ) {
                    return false;
                }
            }
        }
    }

    if (diffX !== 0) {
        if (location.x.toString().includes('.5')) {
            // assume we've checked before entering the half block.
        } else {
            // Handle edge cases too
            // [0, 0, 0],
            //    x
            // [1, 1, 0],
            if (diffX > 0) {
                if (
                    (typeof map[location.y] === 'undefined' ||
                        zeroOrUndefined(map[location.y][location.x])) &&
                    (typeof map[location.y - 1] === 'undefined' ||
                        zeroOrUndefined(map[location.y - 1][location.x]))
                ) {
                    return false;
                }
            } else {
                if (
                    (typeof map[location.y] === 'undefined' ||
                        zeroOrUndefined(map[location.y][location.x - 1])) &&
                    (typeof map[location.y - 1] === 'undefined' ||
                        zeroOrUndefined(map[location.y - 1][location.x - 1]))
                ) {
                    return false;
                }
            }
        }
    }

    return true;
}

export { checkValidTravelPath };
