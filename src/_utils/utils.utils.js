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
export const getRealMana = state => {
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
export const getRealGold = state => {
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
 * @returns {{player: {attack: number}}}
 */
export const getRealAttack = state => {
    const {stats, playerItems} = state;

    let attack = stats.player.attack;

    playerItems.forEach(i => {
        if (i.playerEffect.player != null && i.playerEffect.player.attack != null) attack += i.playerEffect.player.attack;
    });

    return {
        ...stats,
        player: {
            ...stats.player,
            attack,
        },
    }
};
