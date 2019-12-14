/**
 *
 */

import gameConstants from "../_constants/game.constants";

/**
 * base game state
 */
let state = {
    map: {},
};

/**
 * create the default map layout
 */
const d = gameConstants.mapDimensions;

for (let i = 0; i < (d * d); i++) {
    state.map[i] = {
        id: i,
        x: parseInt(i / d),
        y: parseInt(i % d),
        type: gameConstants.typeFlat,
    }
}

/**
 * first tile on map (0,0) is the player city
 */
state.map[0].type = gameConstants.typePlayerCity;

console.log({state})

export default state;