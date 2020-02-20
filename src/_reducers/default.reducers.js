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
    level: {
      current: 1,
      max: 10,
      expRequired: 500,
    },
    gold: {
      current: 5000.0,
      regenAmount: 1.0,
    },
    mana: {
      max: 1000.0,
      current: 500.0,
      regenAmount: 3.0,
    },
    troopGen: {
      [tc.warrior]: 10,
      [tc.swordsman]: 6,
      [tc.archer]: 3,
      [tc.cavalry]: 2,
    },
    troopStats: tc.baseTroopStats,
    shop: [
      {
        id: 1,
        name: `mana regen`,
        effect: `+1.5 mana regen`,
        cost: 300,
        playerEffect: {
          mathematicalOp: `add`,
          mana: {
            regenAmount: 1.5,
          },
        }
      },
      {
        id: 2,
        name: `gold regen`,
        effect: `+0.2 gold regen`,
        cost: 400,
        playerEffect: {
          mathematicalOp: `add`,
          gold: {
            regenAmount: 0.2,
          },
        },
      },
      {
        id: 3,
        name: `attack power`,
        effect: `+10.0 attack`,
        cost: 400,
        playerEffect: {
          mathematicalOp: `add`,
          troopStats: {  //  applies to all troops
            attack: 10,
            defence: 0,
            range: 0,
            speed: 0,
          },
        },
      },
      {
        id: 4,
        name: `range boost`,
        effect: `+15% range`,
        cost: 400,
        playerEffect: {
          mathematicalOp: `multiply`,
          troopStats: {  //  applies to all troops
            attack: 0,
            defence: 0,
            range: 15,
            speed: 0,
          },
        },
      },
    ],
    playerItems: [],
    battleReports: [],
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
    troopCount: {
      [tc.warrior]: 300,
      [tc.swordsman]: 200,
      [tc.archer]: 100,
      [tc.cavalry]: 50,
    },
  }
}

/**
 * first tile on map (0,0) is the player city
 */
state.game.map[0].type = gameConstants.typePlayerCity;
state.game.map[0].troopCount = {
  [tc.warrior]: 1000,
  [tc.swordsman]: 600,
  [tc.archer]: 300,
  [tc.cavalry]: 200,
};

/**
 * powerful npm cities
 */
const NPCTowers = [5, 10, 55, 60, 65, 110, 115];
NPCTowers.forEach(i => {
  state.game.map[i] = {
    ...state.game.map[i],
    type: gameConstants.typeNPCTower,
    troopCount: {
      [tc.warrior]: 10000,
      [tc.swordsman]: 25000,
      [tc.archer]: 5000,
      [tc.cavalry]: 2000,
    },
  };
});

const NPCBase = [120];
NPCBase.forEach(i => {
  state.game.map[i] = {
    ...state.game.map[i],
    type: gameConstants.typeNPCBase,
    troopCount: {
      [tc.warrior]: 100000,
      [tc.swordsman]: 500000,
      [tc.archer]: 50000,
      [tc.cavalry]: 15000,
    },
  };
});

/**
 * shop items
 */

console.log({state})

export default state;