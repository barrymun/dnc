/**
 *
 * @param seconds
 * @returns {Promise<any>}
 */
export const sleep = seconds => new Promise(r => setTimeout(r, seconds * 1000));


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