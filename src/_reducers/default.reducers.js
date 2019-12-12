/**
 *
 */

import gameConstants from "../_constants/game.constants";

/**
 * base game state
 */
let state = {
    map: [],
};

/**
 * create the default map layout
 */
for (let x = 0; x < 10; x++) {
    let row = [];
    for (let y = 0; y < 10; y++) {
        row.push({
            x,
            y,
            type: gameConstants.typeFlat,
        })
    }
    state.map.push(row);
}

/**
 * first tile on map (0,0) is the player city
 */
state.map[0][0].type = gameConstants.typePlayerCity;


// state.map = state.map.map((row, x) => {
//     return row.map((column, y) => {
//         return {
//             ...column,
//             type: 0,
//             x,
//             y,
//         }
//     })
// });

console.log({state})

export default state;