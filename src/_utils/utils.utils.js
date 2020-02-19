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
export const goldBoost = state => {
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
export const troopStatsBoost = state => {
  let {troopStats, playerItems} = state;

  playerItems.forEach(o => {
    if (o.playerEffect.troopStats == null) return;
    troopStats = Object.keys(troopStats).reduce((acc1, key1) => {
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
  });

  return troopStats;

};
