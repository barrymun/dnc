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
        gold: {
            current: 500,
            regenAmount: 1,
        },
        level: {
            current: 1,
            max: 10,
            expRequired: 500,
        },
        mana: {
            current: 500,
            max: 1000,
            regenAmount: 5,
        },
        troopGen: {
            [tc.war]: 10,
            [tc.lgn]: 4,
            [tc.arc]: 6,
            [tc.pult]: 2,
            [tc.mage]: 3,
            [tc.sorc]: 1,
        },
        shop: {},
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
            [tc.war]: 300,
            [tc.lgn]: 200,
            [tc.arc]: 100,
            [tc.pult]: 50,
            [tc.mage]: 0,
            [tc.sorc]: 0,
        },
    }
}

/**
 * first tile on map (0,0) is the player city
 */
state.game.map[0].type = gameConstants.typePlayerCity;
state.game.map[0].troops = {
    [tc.war]: 500,
    [tc.lgn]: 500,
    [tc.arc]: 500,
    [tc.pult]: 500,
    [tc.mage]: 500,
    [tc.sorc]: 500,
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
            [tc.war]: 10000,
            [tc.lgn]: 50000,
            [tc.arc]: 5000,
            [tc.pult]: 10000,
            [tc.mage]: 2000,
            [tc.sorc]: 8000,
        },
    };
});

const NPCBase = [120];
NPCBase.forEach(i => {
    state.game.map[i] = {
        ...state.game.map[i],
        type: gameConstants.typeNPCBase,
        troops: {
            [tc.war]: 50000,
            [tc.lgn]: 300000,
            [tc.arc]: 25000,
            [tc.pult]: 80000,
            [tc.mage]: 20000,
            [tc.sorc]: 50000,
        },
    };
});

/**
 * shop items
 */


console.log({state})

export default state;