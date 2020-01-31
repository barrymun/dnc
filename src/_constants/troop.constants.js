/**
 *
 */

let warrior = `warrior`;
let swordsman = `swordsman`;
let archer = `archer`;
let cavalry = `cavalry`;

export default {
  warrior,
  swordsman,
  archer,
  cavalry,
  baseTroopStats: {
    [warrior]: {
      attack: 160,  // attack power
      defence: 90,  // defence power
      range: 40,  // distance at which troops can engage (say: metres)
      speed: 60,  // the speed at which this troop can travel per round (translates directly to distance)
    },
    [swordsman]: {
      attack: 120,
      defence: 300,
      range: 40,
      speed: 70,
    },
    [archer]: {
      attack: 180,
      defence: 180,
      range: 600,
      speed: 60,
    },
    [cavalry]: {
      attack: 250,
      defence: 150,
      range: 50,
      speed: 800,
    },
  },
};