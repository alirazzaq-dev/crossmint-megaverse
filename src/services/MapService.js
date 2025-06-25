// src/services/MapService.js
import apiClient from "../apiClient.js";
import { CANDIDATE_ID } from "../config.js";

/**
 * @class MapService
 * @description
 *   Fetches the “goal” grid JSON that drives Phase 2.
 */
export default class MapService {
    /**
     * @param {string} candidateId
     */
    constructor(candidateId) {
        /** @private */
        this.candidateId = candidateId;
    }

    /**
     * Retrieve the 2D goal map.
     * @returns {Promise<{ goal: string[][] }>}
     *   An object with a `goal` property: a 2D array of cell codes
     *   like "SPACE", "POLYANET", "BLUE_SOLOON", "UP_COMETH", etc.
     */
    async getGoalMap() {
        const response = await apiClient.get(`/map/${this.candidateId}/goal`);
        return response.data;
    }
}