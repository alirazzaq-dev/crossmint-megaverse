import BaseService from "./BaseService.js";

/**
 * @class PolyanetService
 * @extends BaseService
 * @description
 *   Service for creating/deleting 🪐 Polyanets.
 */
export default class PolyanetService extends BaseService {
    /**
     * @param {string} candidateId
     */
    constructor(candidateId) {
        super("/polyanets", candidateId);
    }

    /**
     * Place a Polyanet at the given cell.
     * @param {number} row 
     * @param {number} column
     * @returns {Promise<import("axios").AxiosResponse<any>>}
     */
    create(row, column) {
        return super.create({ row, column });
    }
}