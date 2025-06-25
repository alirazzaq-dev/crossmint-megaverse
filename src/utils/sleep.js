/**
 * Pause execution for the given ms.
 * Used between API calls to avoid 429s.
 * @param {number} ms
 * @returns {Promise<void>}
 */
export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}