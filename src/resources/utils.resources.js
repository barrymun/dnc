/**
 *
 * @param seconds
 * @returns {Promise<any>}
 */
export const sleep = seconds => new Promise(r => setTimeout(r, seconds * 1000));