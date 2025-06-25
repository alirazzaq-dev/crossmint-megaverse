// src/services/ComethService.js
import BaseService from "./BaseService.js";

/**
 * @class ComethService
 * @extends BaseService
 * @description
 *   Service for creating/deleting ☄ Comeths.
 *   Comeths float alone and have a facing direction.
 */
export default class ComethService extends BaseService {
    /**
     * @param {string} candidateId
     */
    constructor(candidateId) {
        super("/comeths", candidateId);
    }

    /**
     * Place a Cometh at the given cell.
     * @param {number} row 
     * @param {number} column
     * @param {"up"|"down"|"left"|"right"} direction 
     * @returns {Promise<import("axios").AxiosResponse<any>>}
     */
    create(row, column, direction) {
        return super.create({ row, column, direction });
    }
}