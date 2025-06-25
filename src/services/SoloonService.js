import BaseService from "./BaseService.js";

/**
 * @class SoloonService
 * @extends BaseService
 * @description
 *   Service for creating/deleting 🌙 Soloons.
 *   Soloons must be adjacent to a Polyanet and have a color.
 */
export default class SoloonService extends BaseService {
    /**
     * @param {string} candidateId
     */
    constructor(candidateId) {
        super("/soloons", candidateId);
    }

    /**
     * Place a Soloon at the given cell.
     * @param {number} row 
     * @param {number} column
     * @param {"blue"|"red"|"purple"|"white"} color 
     * @returns {Promise<import("axios").AxiosResponse<any>>}
     */
    create(row, column, color) {
        return super.create({ row, column, color });
    }
}