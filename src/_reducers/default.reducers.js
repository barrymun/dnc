/**
 *
 */

import gameConstants from "../_constants/game.constants";
import tc from "../_constants/troop.constants";

/**
 * base game state
 * *** all rate values refer to time in seconds ***
 */
let state = {
    game: {
        map: {},
        selectedTile: null,
        mana: {
            current: 1000,
            max: 1000,
            regenAmount: 5,
        },
        troopGen: {
            [tc.war]: 10,
            [tc.sw]: 5,
            [tc.pk]: 5,
            [tc.arc]: 2,
            [tc.cav]: 1,
        },
    },
};

/**
 * create the default map layout
 */
const d = gameConstants.mapDimensions;

for (let i = 0; i < (d * d); i++) {
    state.game.map[i] = {
        id: i,
        x: parseInt(i / d),
        y: parseInt(i % d),
        type: gameConstants.typeFlat,
        troops: {
            [tc.war]: 1000,
            [tc.sw]: 500,
            [tc.pk]: 500,
            [tc.arc]: 0,
            [tc.cav]: 0,
        },
    }
}

/**
 * first tile on map (0,0) is the player city
 */
state.game.map[0].type = gameConstants.typePlayerCity;
state.game.map[0].troops = {
    [tc.war]: 500,
    [tc.sw]: 500,
    [tc.pk]: 500,
    [tc.arc]: 500,
    [tc.cav]: 500,
};

/**
 * powerful npm cities
 */
const NPCTowers = [5, 10, 55, 60, 65, 110, 115];
NPCTowers.forEach(i => {
    state.game.map[i] = {
        ...state.game.map[i],
        type: gameConstants.typeNPCTower,
        troops: {
            [tc.war]: 50000,
            [tc.sw]: 12000,
            [tc.pk]: 12000,
            [tc.arc]: 8000,
            [tc.cav]: 1000,
        },
    };
});

const NPCBase = [120];
NPCBase.forEach(i => {
    state.game.map[i] = {
        ...state.game.map[i],
        type: gameConstants.typeNPCBase,
        troops: {
            [tc.war]: 120000,
            [tc.sw]: 80000,
            [tc.pk]: 80000,
            [tc.arc]: 30000,
            [tc.cav]: 10000,
        },
    };
});

console.log({state})

export default state;