import tc from "../_constants/troop.constants";


/**
 *
 * @param seconds
 * @returns {Promise<any>}
 */
export const sleep = seconds => new Promise(r => setTimeout(r, seconds * 1000));


/**
 *
 * @param array
 * @param chunkSize
 * @returns {*}
 */
export const createChunks = (array, chunkSize) => {
  return array.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray
  }, []);
};


/**
 *
 * @param state
 * @returns {{max: *, regenAmount: number}}
 */
export const getManaBoost = state => {
  const {mana, playerItems} = state;

  let max = mana.max;
  let regenAmount = mana.regenAmount;

  playerItems.forEach(i => {
    if (i.playerEffect.mana != null && i.playerEffect.mana.max != null) max += i.playerEffect.mana.max;
    if (i.playerEffect.mana != null && i.playerEffect.mana.regenAmount != null) regenAmount += i.playerEffect.mana.regenAmount;
  });

  return {
    ...mana,
    max,
    regenAmount,
  }
};


/**
 *
 * @param state
 * @returns {{regenAmount: number}}
 */
export const getGoldBoost = state => {
  const {gold, playerItems} = state;

  let regenAmount = gold.regenAmount;

  playerItems.forEach(i => {
    if (i.playerEffect.gold != null && i.playerEffect.gold.regenAmount != null) regenAmount += i.playerEffect.gold.regenAmount;
  });

  return {
    ...gold,
    regenAmount,
  }
};


/**
 *
 * @param state
 * @returns {*}
 */
export const getTroopStatsBoost = state => {
  const {troopStats, playerItems} = state;
  console.log({troopStats, playerItems})

  // return {
  //   ...troopStats,
  // }

  // let updatedTroopStats = tc.baseTroopStats;
  // console.log({updatedTroopStats})

  playerItems.forEach(o => {
    if (o.playerEffect.troopStats == null) return;
    let x = Object.keys(troopStats).reduce((acc1, key1) => {
      return {
        ...acc1,
        [key1]: Object.keys(troopStats[key1]).reduce((acc2, key2) => {
          return {
            ...acc2,
            [key2]: troopStats[key1][key2] + o.playerEffect.troopStats[key2],
          }
        }, ({}))
      }
    }, ({}))
    console.log({x})
  })

  console.log({troopStats})


  // playerItems.forEach(o => {
  //   if (o.playerEffect.troopStats == null) return;
  //   Object.keys(updatedTroopStats).forEach(key1 => {
  //     Object.keys(updatedTroopStats[key1]).forEach(key2 => {
  //       updatedTroopStats = {
  //         ...updatedTroopStats,
  //         [key1]: {
  //           ...updatedTroopStats[key1],
  //           [key2]: updatedTroopStats[key1][key2] += o.playerEffect.troopStats[key2]
  //         }
  //       }
  //     });
  //   });
  // });

  // console.log({updatedTroopStats})


  // playerItems.reduce((acc, o) => {
  //   if (o.playerEffect.troopStats == null) return acc;
  // }, ({}));


  return {
    ...troopStats,
  }


  // let attack = troopStats.attack;
  //
  // playerItems.forEach(i => {
  //     if (i.playerEffect.troopStats != null && i.playerEffect.troopStats.attack != null) attack += i.playerEffect.troopStats.attack;
  // });
  //
  // return {
  //     ...stats,
  //     player: {
  //         ...stats.player,
  //         attack,
  //     },
  // }

};
