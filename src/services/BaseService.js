import apiClient from "../apiClient.js";

/**
 * @template TPayload
 * @template TDeleteResult
 * @class BaseService
 * @description
 *   Generic REST wrapper for one entity type at a given path.
 *   Subclasses call `create(payload)` for POST and `delete(row, col)` for DELETE.
 */
export default class BaseService {
    /**
     * @param {string} path   - API path (e.g. "/polyanets")
     * @param {string} candidateId - Your candidate ID
     */
    constructor(path, candidateId) {
        /** @private */
        this.path = path;
        /** @private */
        this.candidateId = candidateId;
    }

    /**
     * Create a new entity.
     * @param {TPayload & { row: number; column: number }} payload
     *  An object containing at least `{ row, column }` plus any extra fields.
     * @returns {Promise<import("axios").AxiosResponse<any>>}  API response
     */
    create(payload = {}) {
        return apiClient.post(this.path, {
            ...payload,
            candidateId: this.candidateId,
        });
    }

    /**
     * Delete an existing entity at a grid cell.
     * @param {number} row 
     * @param {number} column
     * @returns {Promise<import("axios").AxiosResponse<any>>}  API response
     */
    delete(row, column) {
        return apiClient.delete(this.path, {
            data: { row, column, candidateId: this.candidateId },
        });
    }
}